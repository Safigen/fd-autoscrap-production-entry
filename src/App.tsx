import { useState, useEffect, useMemo, useRef } from 'react';
import posthog from 'posthog-js';
import { useFdSession } from '@safi_ai/fd-app';
import '@guidewheel/ui/tokens';
import './index.css';
import { Button } from '@guidewheel/ui/button';
import { FlexColumn, FlexRow } from '@guidewheel/ui/layout';
import { GuidewheelLogo } from '@guidewheel/ui/assets';
import { AlertTriangleIcon, CheckIcon, ClockIcon, TrashIcon } from '@guidewheel/ui/icons';
import { Badge } from '@guidewheel/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@guidewheel/ui/card';
import { Skeleton } from '@guidewheel/ui/skeleton';
import { Toaster, toastFor } from '@guidewheel/ui/toaster';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@guidewheel/ui/tabs';
import { Switch } from '@guidewheel/ui/switch';
import { Label } from '@guidewheel/ui/label';
import { Input, NumberInput } from '@guidewheel/ui/input';
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from '@guidewheel/ui/icons';
import { Popover, PopoverTrigger, PopoverContent } from '@guidewheel/ui/popover';
import { DayPicker } from 'react-day-picker';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@guidewheel/ui/table';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@guidewheel/ui/select';
import { SearchInput } from '@guidewheel/ui/search-input';
import { DisclosureTrigger } from '@guidewheel/ui/button';
import {
  fetchDevices, fetchEnergy, createProductionEntry, fetchUploadHistory,
  fetchSchedules, createSchedule, updateSchedule, deleteSchedule, runScheduleNow,
  getSettings, saveSettings,
  TIMEZONE_OPTIONS, DEFAULT_TIMEZONE,
  type Device, type DeviceEnergy, type Schedule, type UploadHistoryEntry, type TimezoneValue,
} from './api';

const TOASTER_ID = 'main-toaster';

function applyRounding(value: number, rounding: string): number {
  switch (rounding) {
    case 'integer': return Math.round(value);
    case 'one_decimal': return Math.round(value * 10) / 10;
    case 'two_decimals': return Math.round(value * 100) / 100;
    default: return value;
  }
}

function formatRounding(rounding: string): string {
  switch (rounding) {
    case 'integer': return 'Round to integer';
    case 'one_decimal': return '1 decimal place';
    case 'two_decimals': return '2 decimal places';
    default: return 'No rounding';
  }
}

function formatTs(ts: string | number): string {
  const n = typeof ts === 'string' ? Number(ts) : ts;
  if (!n || isNaN(n)) return '—';
  const ms = n > 1e12 ? n : n * 1000;
  return new Date(ms).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

/**
 * Get start-of-day and end-of-day in a given IANA timezone for the selected calendar date.
 * The `date` object's year/month/day are treated as the local date the user picked.
 */
function getDayRange(date: Date, tz: string) {
  const y = date.getFullYear();
  const m = date.getMonth(); // 0-indexed
  const d = date.getDate();

  // Build a date string for midnight in the target timezone, then find the UTC epoch.
  // Use Intl to get the UTC offset for that day in the target timezone.
  const approx = new Date(Date.UTC(y, m, d, 12)); // noon UTC, close enough to get the right offset
  const local = new Date(approx.toLocaleString('en-US', { timeZone: tz }));
  const offsetMs = local.getTime() - approx.getTime();

  const startUtc = Date.UTC(y, m, d) - offsetMs;
  const endUtc = startUtc + 24 * 60 * 60 * 1000;

  return {
    fromTs: new Date(startUtc).toISOString(),
    toTs: new Date(endUtc).toISOString(),
    fromUnix: Math.floor(startUtc / 1000),
    toUnix: Math.floor(endUtc / 1000),
    label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
}

function getYesterday(): Date {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

const DAY_PICKER_CLASSES = {
  root: 'text-foreground',
  months: 'flex flex-col',
  month: 'space-y-4',
  month_caption: 'flex justify-center pt-1 relative items-center',
  caption_label: 'text-sm font-medium',
  nav: 'flex items-center gap-1',
  button_previous:
    'inline-flex items-center justify-center rounded-sm h-7 w-7 bg-transparent hover:bg-surface text-foreground',
  button_next:
    'inline-flex items-center justify-center rounded-sm h-7 w-7 bg-transparent hover:bg-surface text-foreground',
  month_grid: 'w-full border-collapse space-y-1',
  weekdays: 'flex',
  weekday: 'text-muted-foreground rounded-sm w-9 font-normal text-[0.8rem]',
  week: 'flex w-full mt-2',
  day: 'h-9 w-9 text-center text-sm relative flex items-center justify-center rounded-sm hover:bg-surface',
  day_button: 'h-9 w-9 p-0 font-normal inline-flex items-center justify-center',
  selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
  today: 'font-bold',
  outside: 'text-muted-foreground opacity-50',
  disabled: 'text-muted-foreground opacity-50 pointer-events-none',
};

function PastDatePicker({ selected, onSelect, placeholder = 'Pick a date' }: {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="solid"
          color="default"
          className={`justify-start text-left font-normal ${!selected ? 'text-muted-foreground' : ''}`}
        >
          <CalendarIcon />
          <span>{selected ? selected.toLocaleDateString() : placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(date) => { onSelect?.(date); setOpen(false); }}
          disabled={{ from: today, to: new Date(2100, 0, 1) }}
          classNames={DAY_PICKER_CLASSES}
        />
      </PopoverContent>
    </Popover>
  );
}

/** Alphabetical sort by nickname (case-insensitive), fallback to deviceid. */
function sortDevicesByName(a: Device, b: Device): number {
  const an = (a.nickname || a.deviceid).toLowerCase();
  const bn = (b.nickname || b.deviceid).toLowerCase();
  return an.localeCompare(bn);
}

/** Searchable device picker with arrow-key navigation. */
function DevicePicker({
  devices,
  value,
  onChange,
  placeholder = 'Select device',
  className,
}: {
  devices: Device[];
  value: string;
  onChange: (id: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightIdx, setHighlightIdx] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return devices;
    return devices.filter((d) => (d.nickname || d.deviceid).toLowerCase().includes(q));
  }, [devices, search]);

  // Reset highlight when filtered list changes
  useEffect(() => { setHighlightIdx(0); }, [filtered]);

  // Focus search input when popover opens
  useEffect(() => {
    if (open) {
      setSearch('');
      setHighlightIdx(0);
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [open]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const item = list.children[highlightIdx] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [highlightIdx, open]);

  const selectItem = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[highlightIdx]) selectItem(filtered[highlightIdx].deviceid);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const selected = devices.find((d) => d.deviceid === value);
  const label = selected ? (selected.nickname || selected.deviceid) : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <DisclosureTrigger
          className={`w-full justify-between font-normal ${!selected ? 'text-muted-foreground' : ''} ${className ?? ''}`}
        >
          <span className="truncate">{label}</span>
        </DisclosureTrigger>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start" onKeyDown={handleKeyDown}>
        <div className="border-b border-muted p-2">
          <Input
            ref={searchRef}
            placeholder="Search devices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 text-sm"
          />
        </div>
        <div ref={listRef} className="max-h-60 overflow-y-auto p-1">
          {filtered.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">No devices found</p>
          ) : filtered.map((d, i) => (
            <button
              key={d.deviceid}
              type="button"
              className={`flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm ${
                i === highlightIdx ? 'bg-surface text-foreground' : 'text-foreground hover:bg-surface'
              } ${d.deviceid === value ? 'font-medium' : ''}`}
              onClick={() => selectItem(d.deviceid)}
              onMouseEnter={() => setHighlightIdx(i)}
            >
              <span className="truncate">{d.nickname || d.deviceid}</span>
              {d.deviceid === value && <CheckIcon size="xs" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

type SortDir = 'asc' | 'desc';

function SortableHead({
  label,
  columnId,
  sortBy,
  sortDir,
  onSort,
  align = 'left',
}: {
  label: React.ReactNode;
  columnId: string;
  sortBy: string;
  sortDir: SortDir;
  onSort: (id: string) => void;
  align?: 'left' | 'right';
}) {
  const active = sortBy === columnId;
  return (
    <TableHead className={align === 'right' ? 'text-right' : undefined}>
      <button
        type="button"
        onClick={() => onSort(columnId)}
        className={`inline-flex items-center gap-1 select-none hover:text-foreground ${active ? 'text-foreground font-semibold' : ''}`}
      >
        <span>{label}</span>
        {active && (sortDir === 'asc' ? <ChevronUpIcon size="xs" /> : <ChevronDownIcon size="xs" />)}
      </button>
    </TableHead>
  );
}

posthog.init('phc_QIgbD8nFuxMwPrURQbXJxKqI1uEwrmWrnorrr5v1oto', {
  api_host: 'https://us.i.posthog.com',
  persistence: 'localStorage',
});

function App() {
  const session = useFdSession();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  // Identify user in PostHog from fd-app session
  useEffect(() => {
    if (session?.username) {
      posthog.identify(session.username);
    }
  }, [session?.username]);

  // Settings
  const [defaultDivisor, setDefaultDivisor] = useState(() => getSettings().default_divisor);
  const [appTimezone, setAppTimezone] = useState<TimezoneValue>(() => getSettings().timezone ?? DEFAULT_TIMEZONE);

  // Create entry form state
  const [sourceDeviceId, setSourceDeviceId] = useState('');
  const [targetDeviceId, setTargetDeviceId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(getYesterday());
  const [divisor, setDivisor] = useState(defaultDivisor);
  const [rounding, setRounding] = useState<'none' | 'integer' | 'one_decimal' | 'two_decimals'>('integer');
  const [entryTimezone, setEntryTimezone] = useState<TimezoneValue>(appTimezone);
  const [creatingEntry, setCreatingEntry] = useState(false);
  const [previewEnergy, setPreviewEnergy] = useState<number | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  // Upload history from server
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Energy tab
  const [energyDate, setEnergyDate] = useState<Date | undefined>(getYesterday());
  const [energy, setEnergy] = useState<DeviceEnergy[]>([]);
  const [energyLoading, setEnergyLoading] = useState(false);

  // Schedules
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [schedSourceDevice, setSchedSourceDevice] = useState('');
  const [schedTargetDevice, setSchedTargetDevice] = useState('');
  const [schedFrequency, setSchedFrequency] = useState<'daily' | 'weekly'>('daily');
  const [schedTime, setSchedTime] = useState('06:00');
  const [schedTimezone, setSchedTimezone] = useState<TimezoneValue>(appTimezone);
  const [schedDivisor, setSchedDivisor] = useState<number>(defaultDivisor);
  const [schedRounding, setSchedRounding] = useState<'none' | 'integer' | 'one_decimal' | 'two_decimals'>('integer');
  const [creatingSched, setCreatingSched] = useState(false);

  // Settings tab
  const [settingsDivisor, setSettingsDivisor] = useState(defaultDivisor);
  const [settingsTimezone, setSettingsTimezone] = useState<TimezoneValue>(appTimezone);

  // Energy table controls
  const [energySearch, setEnergySearch] = useState('');
  const [energySortBy, setEnergySortBy] = useState<string>('nickname');
  const [energySortDir, setEnergySortDir] = useState<SortDir>('asc');

  // History table controls
  const [historySearch, setHistorySearch] = useState('');
  const [historySortBy, setHistorySortBy] = useState<string>('created');
  const [historySortDir, setHistorySortDir] = useState<SortDir>('desc');

  // Load devices on mount
  useEffect(() => {
    async function load() {
      try {
        const devs = await fetchDevices();
        setDevices([...devs].sort(sortDevicesByName));
      } catch {
        toastFor(TOASTER_ID).error('Failed to load devices. Please refresh.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const deviceMap = useMemo(() => {
    const map = new Map<string, Device>();
    devices.forEach((d) => map.set(d.deviceid, d));
    return map;
  }, [devices]);

  const deviceName = (id: string) => deviceMap.get(id)?.nickname ?? id;

  // Fetch energy preview when source device + date change
  useEffect(() => {
    if (!sourceDeviceId || !selectedDate) {
      setPreviewEnergy(null);
      return;
    }
    let cancelled = false;
    async function loadPreview() {
      setLoadingPreview(true);
      try {
        const range = getDayRange(selectedDate!, entryTimezone);
        const data = await fetchEnergy(range.fromTs, range.toTs);
        if (cancelled) return;
        const deviceData = data.find((d) => d.deviceid === sourceDeviceId);
        setPreviewEnergy(deviceData?.energy.total ?? null);
      } catch {
        if (!cancelled) setPreviewEnergy(null);
      } finally {
        if (!cancelled) setLoadingPreview(false);
      }
    }
    loadPreview();
    return () => { cancelled = true; };
  }, [sourceDeviceId, selectedDate, entryTimezone]);

  const wastePreview = previewEnergy != null && divisor > 0
    ? applyRounding(previewEnergy / divisor, rounding)
    : null;

  const loadUploadHistory = async () => {
    setHistoryLoading(true);
    try {
      setUploadHistory(await fetchUploadHistory());
    } catch {
      toastFor(TOASTER_ID).error('Failed to load upload history.');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleCreateEntry = async () => {
    if (!sourceDeviceId || !targetDeviceId || !selectedDate || divisor <= 0) return;
    setCreatingEntry(true);
    try {
      const range = getDayRange(selectedDate, entryTimezone);
      const result = await createProductionEntry(
        targetDeviceId, range.fromUnix, range.toUnix, wastePreview,
        { source_device_id: sourceDeviceId, total_energy: previewEnergy, divisor, rounding },
      );

      if (result.ok) {
        toastFor(TOASTER_ID).success(`Production entry created (${result.status}).`);
        // Refresh server-side history
        loadUploadHistory();
      } else {
        toastFor(TOASTER_ID).error(`SAFI error (${result.status}): ${result.error}`);
        loadUploadHistory();
      }
    } catch {
      toastFor(TOASTER_ID).error('Failed to connect to server.');
    } finally {
      setCreatingEntry(false);
    }
  };

  // Energy tab loader
  const loadEnergy = async () => {
    if (!energyDate) return;
    setEnergyLoading(true);
    try {
      const range = getDayRange(energyDate, appTimezone);
      const data = await fetchEnergy(range.fromTs, range.toTs);
      setEnergy(data);
    } catch {
      toastFor(TOASTER_ID).error('Failed to load energy data.');
    } finally {
      setEnergyLoading(false);
    }
  };

  useEffect(() => {
    if (energyDate) loadEnergy();
  }, [energyDate]);

  const enrichedEnergy = useMemo(() => {
    return energy.map((e) => ({
      ...e,
      nickname: deviceMap.get(e.deviceid)?.nickname ?? e.deviceid,
      wasteValue: e.energy.total != null && divisor > 0 ? +(e.energy.total / divisor).toFixed(4) : null,
    }));
  }, [energy, deviceMap, divisor]);

  const displayedEnergy = useMemo(() => {
    const q = energySearch.trim().toLowerCase();
    const filtered = q
      ? enrichedEnergy.filter((e) => (e.nickname || e.deviceid).toLowerCase().includes(q))
      : enrichedEnergy;
    const dir = energySortDir === 'asc' ? 1 : -1;
    const keyFns: Record<string, (e: typeof enrichedEnergy[number]) => string | number> = {
      nickname: (e) => (e.nickname || e.deviceid).toLowerCase(),
      online: (e) => e.energy.online ?? -Infinity,
      idle: (e) => e.energy.idle ?? -Infinity,
      offline: (e) => e.energy.offline ?? -Infinity,
      total: (e) => e.energy.total ?? -Infinity,
      waste: (e) => e.wasteValue ?? -Infinity,
    };
    const keyFn = keyFns[energySortBy] ?? keyFns.nickname;
    return [...filtered].sort((a, b) => {
      const av = keyFn(a);
      const bv = keyFn(b);
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [enrichedEnergy, energySearch, energySortBy, energySortDir]);

  const handleEnergySort = (id: string) => {
    if (energySortBy === id) {
      setEnergySortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setEnergySortBy(id);
      setEnergySortDir('asc');
    }
  };

  const displayedHistory = useMemo(() => {
    const q = historySearch.trim().toLowerCase();
    const filtered = q
      ? uploadHistory.filter((e) => {
          const src = deviceName(e.source_device_id ?? '').toLowerCase();
          const tgt = deviceName(e.target_device_id).toLowerCase();
          return src.includes(q) || tgt.includes(q);
        })
      : uploadHistory;
    const dir = historySortDir === 'asc' ? 1 : -1;
    const keyFns: Record<string, (e: UploadHistoryEntry) => string | number> = {
      source: (e) => deviceName(e.source_device_id ?? '').toLowerCase(),
      target: (e) => deviceName(e.target_device_id).toLowerCase(),
      date: (e) => Number(e.from_ts) || 0,
      energy: (e) => e.total_energy ?? -Infinity,
      divisor: (e) => e.divisor ?? 0,
      waste: (e) => (e.waste_value ?? -Infinity) as number,
      created: (e) => new Date(e.created_at).getTime(),
    };
    const keyFn = keyFns[historySortBy] ?? keyFns.source;
    return [...filtered].sort((a, b) => {
      const av = keyFn(a);
      const bv = keyFn(b);
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadHistory, historySearch, historySortBy, historySortDir, deviceMap]);

  const handleHistorySort = (id: string) => {
    if (historySortBy === id) {
      setHistorySortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setHistorySortBy(id);
      setHistorySortDir('asc');
    }
  };

  const totalEnergy = useMemo(() => energy.reduce((sum, e) => sum + (e.energy.total ?? 0), 0), [energy]);
  const totalWaste = divisor > 0 ? totalEnergy / divisor : 0;

  // Schedules
  const loadSchedules = async () => {
    setSchedulesLoading(true);
    try {
      setSchedules(await fetchSchedules());
    } catch {
      toastFor(TOASTER_ID).error('Failed to load schedules.');
    } finally {
      setSchedulesLoading(false);
    }
  };

  const handleCreateSchedule = async () => {
    if (!schedSourceDevice || !schedTargetDevice) return;
    setCreatingSched(true);
    try {
      const sched = await createSchedule({
        source_device_id: schedSourceDevice,
        target_device_id: schedTargetDevice,
        frequency: schedFrequency,
        time: schedTime,
        timezone: schedTimezone,
        divisor: schedDivisor,
        rounding: schedRounding,
        enabled: true,
      });
      setSchedules((prev) => [...prev, sched]);
      setSchedSourceDevice('');
      setSchedTargetDevice('');
      setSchedTime('06:00');
      setSchedTimezone(appTimezone);
      setSchedDivisor(defaultDivisor);
      setSchedRounding('none');
      toastFor(TOASTER_ID).success('Schedule created!');
    } catch {
      toastFor(TOASTER_ID).error('Failed to create schedule.');
    } finally {
      setCreatingSched(false);
    }
  };

  const handleToggleSchedule = async (sched: Schedule) => {
    try {
      const updated = await updateSchedule(sched.id, { enabled: !sched.enabled });
      setSchedules((prev) => prev.map((s) => s.id === sched.id ? updated : s));
    } catch {
      toastFor(TOASTER_ID).error('Failed to update schedule.');
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    try {
      await deleteSchedule(id);
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      toastFor(TOASTER_ID).success('Schedule removed.');
    } catch {
      toastFor(TOASTER_ID).error('Failed to delete schedule.');
    }
  };

  const [runningScheduleId, setRunningScheduleId] = useState<string | null>(null);

  const handleRunSchedule = async (sched: Schedule) => {
    setRunningScheduleId(sched.id);
    try {
      const result = await runScheduleNow(sched.id);
      if (result.skipped) {
        toastFor(TOASTER_ID).error(`Skipped: ${result.reason === 'no_energy_data' ? 'No energy data for source device' : result.reason}`);
      } else if (result.error) {
        toastFor(TOASTER_ID).error(`SAFI error (${result.status}): ${result.error}`);
      } else {
        toastFor(TOASTER_ID).success(`Entry created! Energy: ${result.energy?.toFixed(1)} kWh, Waste: ${result.waste}`);
      }
      // Refresh upload history to include the new entry
      loadUploadHistory();
    } catch (err: any) {
      toastFor(TOASTER_ID).error(err.message || 'Failed to run schedule.');
    } finally {
      setRunningScheduleId(null);
    }
  };

  const handleSaveSettings = () => {
    if (settingsDivisor <= 0) return;
    saveSettings({ default_divisor: settingsDivisor, timezone: settingsTimezone });
    setDefaultDivisor(settingsDivisor);
    setDivisor(settingsDivisor);
    setAppTimezone(settingsTimezone);
    setEntryTimezone(settingsTimezone);
    setSchedTimezone(settingsTimezone);
    toastFor(TOASTER_ID).success('Settings saved!');
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'history') loadUploadHistory();
    if (tab === 'schedules' && schedules.length === 0) loadSchedules();
    if (tab === 'settings') {
      const s = getSettings();
      setSettingsDivisor(s.default_divisor);
      setSettingsTimezone(s.timezone ?? DEFAULT_TIMEZONE);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Prototype banner */}
      <div
        className="flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-medium"
        style={{
          backgroundColor: 'var(--color-danger-0)',
          color: 'var(--color-danger-700)',
          borderBottom: '1px solid var(--color-danger-200)',
        }}
      >
        <AlertTriangleIcon size="xs" />
        Prototype — not connected to production data
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <FlexColumn spacing={6}>
          {/* Header */}
          <FlexRow className="items-center justify-between">
            <FlexColumn spacing={1}>
              <GuidewheelLogo className="w-36" />
              <h1 className="text-2xl font-semibold text-foreground">
                Autoscrap Production Entry
              </h1>
            </FlexColumn>
            <Button
              variant="text"
              onClick={() => {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_email');
                window.location.reload();
              }}
            >
              Log out
            </Button>
          </FlexRow>

          {/* Create production entry */}
          <Card>
            <CardHeader>
              <CardTitle>Create Production Entry</CardTitle>
              <CardDescription>
                Pull energy from a source device, divide to calculate waste, and create a production entry on the target device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FlexColumn spacing={4}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1.5 block text-sm">Source device (pull energy from)</Label>
                    <DevicePicker
                      devices={devices}
                      value={sourceDeviceId}
                      onChange={setSourceDeviceId}
                      placeholder="Select source device"
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Target device (create entry for)</Label>
                    <DevicePicker
                      devices={devices}
                      value={targetDeviceId}
                      onChange={setTargetDeviceId}
                      placeholder="Select target device"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <Label className="mb-1.5 block text-sm">Date</Label>
                    <PastDatePicker
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      placeholder="Pick a date"
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Timezone</Label>
                    <Select value={entryTimezone} onValueChange={(v) => setEntryTimezone(v as TimezoneValue)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMEZONE_OPTIONS.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Divide energy by</Label>
                    <NumberInput
                      value={divisor}
                      onChange={(e) => setDivisor(Number(e.target.value))}
                      min={0.01}
                      step={1}
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 block text-sm">Waste rounding</Label>
                    <Select value={rounding} onValueChange={(v) => setRounding(v as typeof rounding)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No rounding (raw)</SelectItem>
                        <SelectItem value="integer">Round to integer</SelectItem>
                        <SelectItem value="one_decimal">1 decimal place</SelectItem>
                        <SelectItem value="two_decimals">2 decimal places</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preview */}
                {sourceDeviceId && selectedDate && (
                  <div className="rounded-md border border-muted bg-background-accent p-4">
                    {loadingPreview ? (
                      <FlexRow spacing={2} className="items-center">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </FlexRow>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                        <div>
                          <p className="text-muted-foreground">Source</p>
                          <p className="font-medium text-foreground">{deviceName(sourceDeviceId)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium text-foreground">{getDayRange(selectedDate, entryTimezone).label}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Energy</p>
                          <p className="font-medium text-foreground">
                            {previewEnergy != null ? `${previewEnergy.toFixed(4)} kWh` : '—'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Est. Waste (÷ {divisor})</p>
                          <p className="font-semibold text-primary">
                            {wastePreview != null ? wastePreview : '—'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <Button
                    color="primary"
                    onClick={handleCreateEntry}
                    loading={creatingEntry}
                    disabled={!sourceDeviceId || !targetDeviceId || !selectedDate || divisor <= 0}
                  >
                    Create Entry
                  </Button>
                </div>
              </FlexColumn>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="energy" onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="energy">Energy by Device</TabsTrigger>
              <TabsTrigger value="history">Upload History</TabsTrigger>
              <TabsTrigger value="schedules">Schedules</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* --- Energy tab --- */}
            <TabsContent value="energy">
              <FlexColumn spacing={4}>
                <FlexRow spacing={3} className="items-end">
                  <div>
                    <Label className="mb-1.5 block text-sm">Date</Label>
                    <PastDatePicker
                      selected={energyDate}
                      onSelect={setEnergyDate}
                      placeholder="Pick a date"
                    />
                  </div>
                  <Button variant="text" onClick={loadEnergy} disabled={energyLoading}>
                    Refresh
                  </Button>
                </FlexRow>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Card>
                    <CardHeader><CardTitle>Devices</CardTitle></CardHeader>
                    <CardContent>
                      {energyLoading
                        ? <Skeleton className="h-8 w-16" />
                        : <p className="text-3xl font-semibold text-foreground">{energy.length}</p>}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Total Energy (kWh)</CardTitle></CardHeader>
                    <CardContent>
                      {energyLoading
                        ? <Skeleton className="h-8 w-24" />
                        : <p className="text-3xl font-semibold text-foreground">{totalEnergy.toFixed(2)}</p>}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Est. Waste (÷ {divisor})</CardTitle></CardHeader>
                    <CardContent>
                      {energyLoading
                        ? <Skeleton className="h-8 w-24" />
                        : <p className="text-3xl font-semibold text-primary">{totalWaste.toFixed(4)}</p>}
                    </CardContent>
                  </Card>
                </div>

                {/* Energy table */}
                <Card>
                  <CardContent className="pt-6">
                    <FlexColumn spacing={3}>
                      <div className="max-w-sm">
                        <SearchInput
                          placeholder="Search devices..."
                          value={energySearch}
                          onChange={(e) => setEnergySearch(e.target.value)}
                          onClear={() => setEnergySearch('')}
                        />
                      </div>
                      {energyLoading ? (
                        <FlexColumn spacing={2}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                          ))}
                        </FlexColumn>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <SortableHead label="Device" columnId="nickname" sortBy={energySortBy} sortDir={energySortDir} onSort={handleEnergySort} />
                              <SortableHead label="Online (kWh)" columnId="online" sortBy={energySortBy} sortDir={energySortDir} onSort={handleEnergySort} align="right" />
                              <SortableHead label="Idle (kWh)" columnId="idle" sortBy={energySortBy} sortDir={energySortDir} onSort={handleEnergySort} align="right" />
                              <SortableHead label="Offline (kWh)" columnId="offline" sortBy={energySortBy} sortDir={energySortDir} onSort={handleEnergySort} align="right" />
                              <SortableHead label="Total (kWh)" columnId="total" sortBy={energySortBy} sortDir={energySortDir} onSort={handleEnergySort} align="right" />
                              <SortableHead label={`Waste (÷ ${divisor})`} columnId="waste" sortBy={energySortBy} sortDir={energySortDir} onSort={handleEnergySort} align="right" />
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {displayedEnergy.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-6">
                                  {energySearch ? 'No devices match your search.' : 'No energy data for this date.'}
                                </TableCell>
                              </TableRow>
                            ) : displayedEnergy.map((e) => (
                              <TableRow key={e.deviceid}>
                                <TableCell className="font-medium">{e.nickname}</TableCell>
                                <TableCell className="text-right">{e.energy.online?.toFixed(2) ?? '—'}</TableCell>
                                <TableCell className="text-right">{e.energy.idle?.toFixed(2) ?? '—'}</TableCell>
                                <TableCell className="text-right">{e.energy.offline?.toFixed(2) ?? '—'}</TableCell>
                                <TableCell className="text-right">{e.energy.total?.toFixed(2) ?? '—'}</TableCell>
                                <TableCell className="text-right font-semibold text-primary">
                                  {e.wasteValue?.toFixed(4) ?? '—'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </FlexColumn>
                  </CardContent>
                </Card>
              </FlexColumn>
            </TabsContent>

            {/* --- History tab --- */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <FlexRow className="items-center justify-between">
                    <CardTitle>Upload History</CardTitle>
                    <FlexRow spacing={2} className="items-center">
                      <p className="text-xs text-muted-foreground">
                        Manual and scheduled entries
                      </p>
                      <Button variant="text" size="sm" onClick={loadUploadHistory} disabled={historyLoading}>
                        Refresh
                      </Button>
                    </FlexRow>
                  </FlexRow>
                </CardHeader>
                <CardContent>
                  {historyLoading ? (
                    <FlexColumn spacing={2}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full" />
                      ))}
                    </FlexColumn>
                  ) : uploadHistory.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      No upload history yet. Create an entry or run a schedule.
                    </p>
                  ) : (
                    <FlexColumn spacing={3}>
                      <div className="max-w-sm">
                        <SearchInput
                          placeholder="Search by device name..."
                          value={historySearch}
                          onChange={(e) => setHistorySearch(e.target.value)}
                          onClear={() => setHistorySearch('')}
                        />
                      </div>
                      <Table>
                      <TableHeader>
                        <TableRow>
                          <SortableHead label="Created" columnId="created" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} />
                          <TableHead>Source</TableHead>
                          <SortableHead label="Source Device" columnId="source" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} />
                          <SortableHead label="Target Device" columnId="target" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} />
                          <SortableHead label="Date" columnId="date" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} />
                          <SortableHead label="Energy (kWh)" columnId="energy" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} align="right" />
                          <SortableHead label="Divisor" columnId="divisor" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} align="right" />
                          <SortableHead label="Waste" columnId="waste" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} align="right" />
                          <TableHead>Rounding</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {displayedHistory.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={10} className="text-center text-sm text-muted-foreground py-6">
                              No entries match your search.
                            </TableCell>
                          </TableRow>
                        ) : displayedHistory.map((entry) => (
                          <TableRow key={entry.id + entry.created_at}>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(entry.created_at).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={entry.source === 'scheduled' ? 'secondary' : 'outline'} size="sm">
                                {entry.source === 'scheduled' ? 'Scheduled' : 'Manual'}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              {deviceName(entry.source_device_id ?? '')}
                            </TableCell>
                            <TableCell className="font-medium">
                              {deviceName(entry.target_device_id)}
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatTs(entry.from_ts)}
                            </TableCell>
                            <TableCell className="text-right text-sm">
                              {entry.total_energy != null ? entry.total_energy.toFixed(4) : '—'}
                            </TableCell>
                            <TableCell className="text-right text-sm">
                              ÷ {entry.divisor ?? 60}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {entry.waste_value != null ? entry.waste_value : '—'}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {formatRounding(entry.rounding ?? 'none')}
                            </TableCell>
                            <TableCell>
                              {entry.api_error ? (
                                <Badge variant="danger">
                                  <FlexRow spacing={1} className="items-center">
                                    <AlertTriangleIcon size="xs" />
                                    {entry.api_status ?? 'err'}: {entry.api_error}
                                  </FlexRow>
                                </Badge>
                              ) : (
                                <Badge variant="success">
                                  <FlexRow spacing={1} className="items-center">
                                    <CheckIcon size="xs" />
                                    {entry.api_status ?? ''} created
                                  </FlexRow>
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    </FlexColumn>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- Schedules tab --- */}
            <TabsContent value="schedules">
              <FlexColumn spacing={4}>
                <Card>
                  <CardHeader>
                    <CardTitle>New Schedule</CardTitle>
                    <CardDescription>
                      Automate pulling energy from one device and creating a waste production entry on another.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FlexColumn spacing={4}>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <Label className="mb-1.5 block text-sm">Energy source device</Label>
                          <DevicePicker
                            devices={devices}
                            value={schedSourceDevice}
                            onChange={setSchedSourceDevice}
                            placeholder="Pull energy from..."
                          />
                        </div>
                        <div>
                          <Label className="mb-1.5 block text-sm">Target device for production entry</Label>
                          <DevicePicker
                            devices={devices}
                            value={schedTargetDevice}
                            onChange={setSchedTargetDevice}
                            placeholder="Create entry for..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        <div>
                          <Label className="mb-1.5 block text-sm">Frequency</Label>
                          <Select value={schedFrequency} onValueChange={(v) => setSchedFrequency(v as typeof schedFrequency)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="mb-1.5 block text-sm">Time of day</Label>
                          <Input
                            type="time"
                            value={schedTime}
                            onChange={(e) => setSchedTime(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="mb-1.5 block text-sm">Timezone</Label>
                          <Select value={schedTimezone} onValueChange={(v) => setSchedTimezone(v as TimezoneValue)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {TIMEZONE_OPTIONS.map((tz) => (
                                <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="mb-1.5 block text-sm">Divide energy by</Label>
                          <NumberInput
                            min={0}
                            step={1}
                            value={Number.isFinite(schedDivisor) ? schedDivisor : ''}
                            onChange={(e) => {
                              const n = Number(e.target.value);
                              setSchedDivisor(Number.isFinite(n) ? n : 0);
                            }}
                          />
                        </div>
                        <div>
                          <Label className="mb-1.5 block text-sm">Waste rounding</Label>
                          <Select value={schedRounding} onValueChange={(v) => setSchedRounding(v as typeof schedRounding)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No rounding (raw)</SelectItem>
                              <SelectItem value="integer">Round to integer</SelectItem>
                              <SelectItem value="one_decimal">1 decimal place</SelectItem>
                              <SelectItem value="two_decimals">2 decimal places</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="rounded-md border border-muted bg-background-accent p-3 text-sm">
                        <p className="mb-2 text-muted-foreground">
                          <strong className="text-foreground">How time of day works:</strong>{' '}
                          The time only controls <em>when</em> the run fires — it never changes
                          the size of the energy window. Each run pulls the previous completed period.
                        </p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Frequency</TableHead>
                              <TableHead>At time T, pulls energy for…</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Daily</TableCell>
                              <TableCell>Yesterday 00:00 → 23:59 (24h)</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Weekly</TableCell>
                              <TableCell>Previous Mon 00:00 → previous Sun 23:59 (7d)</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <p className="mt-2 text-muted-foreground">
                          A daily schedule at 02:00 and one at 23:00 pull the <strong className="text-foreground">same window</strong> —
                          they just run at different clock times. Pick a time a few hours after midnight
                          so all sensor data has flushed to SAFI.
                        </p>
                      </div>

                      {schedSourceDevice && schedTargetDevice && (
                        <div className="rounded-md border border-muted bg-background-accent p-3 text-sm">
                          <p className="text-muted-foreground">
                            <strong className="text-foreground">Preview:</strong>{' '}
                            Every {schedFrequency === 'daily' ? 'day' : 'week'} at{' '}
                            {schedTime} {TIMEZONE_OPTIONS.find(t => t.value === schedTimezone)?.label ?? schedTimezone}, pull energy from{' '}
                            <strong className="text-foreground">{deviceName(schedSourceDevice)}</strong>,
                            divide by {schedDivisor}
                            {schedRounding !== 'none' && ` (${formatRounding(schedRounding).toLowerCase()})`},
                            and create a production entry on{' '}
                            <strong className="text-foreground">{deviceName(schedTargetDevice)}</strong>.
                          </p>
                        </div>
                      )}

                      <div>
                        <Button
                          color="primary"
                          onClick={handleCreateSchedule}
                          loading={creatingSched}
                          disabled={!schedSourceDevice || !schedTargetDevice}
                        >
                          Create Schedule
                        </Button>
                      </div>
                    </FlexColumn>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <FlexRow className="items-center justify-between">
                      <CardTitle>Active Schedules</CardTitle>
                      <Button variant="text" onClick={loadSchedules} disabled={schedulesLoading}>
                        Refresh
                      </Button>
                    </FlexRow>
                  </CardHeader>
                  <CardContent>
                    {schedulesLoading ? (
                      <FlexColumn spacing={2}>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Skeleton key={i} className="h-16 w-full" />
                        ))}
                      </FlexColumn>
                    ) : schedules.length === 0 ? (
                      <p className="py-8 text-center text-sm text-muted-foreground">
                        No schedules configured yet.
                      </p>
                    ) : (
                      <FlexColumn spacing={3}>
                        {schedules.map((sched) => (
                          <div
                            key={sched.id}
                            className={`flex items-center justify-between rounded-lg border p-4 ${
                              sched.enabled ? 'border-muted' : 'border-muted opacity-50'
                            }`}
                          >
                            <FlexColumn spacing={1} className="flex-1">
                              <FlexRow spacing={2} className="items-center">
                                <ClockIcon size="sm" />
                                <span className="text-sm font-medium text-foreground">
                                  {deviceName(sched.source_device_id)} → {deviceName(sched.target_device_id)}
                                </span>
                                <Badge variant={sched.enabled ? 'success' : 'outline'}>
                                  {sched.enabled ? 'Active' : 'Paused'}
                                </Badge>
                              </FlexRow>
                              <p className="ml-6 text-xs text-muted-foreground">
                                {sched.frequency.charAt(0).toUpperCase() + sched.frequency.slice(1)} at {sched.time} {TIMEZONE_OPTIONS.find(t => t.value === sched.timezone)?.label ?? sched.timezone ?? 'PT'} · ÷{sched.divisor ?? defaultDivisor} · {formatRounding(sched.rounding)}
                              </p>
                            </FlexColumn>
                            <FlexRow spacing={3} className="items-center">
                              <Button
                                variant="text"
                                size="sm"
                                loading={runningScheduleId === sched.id}
                                onClick={() => handleRunSchedule(sched)}
                              >
                                Run Now
                              </Button>
                              <Switch
                                checked={sched.enabled}
                                onCheckedChange={() => handleToggleSchedule(sched)}
                              />
                              <Button
                                size="icon"
                                variant="text"
                                color="danger"
                                onClick={() => handleDeleteSchedule(sched.id)}
                              >
                                <TrashIcon />
                              </Button>
                            </FlexRow>
                          </div>
                        ))}
                      </FlexColumn>
                    )}
                  </CardContent>
                </Card>
              </FlexColumn>
            </TabsContent>

            {/* --- Settings tab --- */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Configure default values used across the app.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FlexColumn spacing={4}>
                    <div className="max-w-xs">
                      <Label className="mb-1.5 block text-sm">Default energy divisor</Label>
                      <NumberInput
                        value={settingsDivisor}
                        onChange={(e) => setSettingsDivisor(Number(e.target.value))}
                        min={0.01}
                        step={1}
                      />
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Energy will be divided by this number to calculate waste. This value is used as the default when creating new entries.
                      </p>
                    </div>
                    <div className="max-w-xs">
                      <Label className="mb-1.5 block text-sm">Default timezone</Label>
                      <Select value={settingsTimezone} onValueChange={(v) => setSettingsTimezone(v as TimezoneValue)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TIMEZONE_OPTIONS.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Default timezone for new entries and schedules. Controls which calendar day's midnight-to-midnight is used for energy lookups and production entries.
                      </p>
                    </div>
                    <div>
                      <Button
                        color="primary"
                        onClick={handleSaveSettings}
                        disabled={settingsDivisor <= 0}
                      >
                        Save Settings
                      </Button>
                    </div>
                  </FlexColumn>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </FlexColumn>
      </div>

      <Toaster id={TOASTER_ID} />
    </div>
  );
}

export default App;
