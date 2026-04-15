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
  type Device, type DeviceEnergy, type Schedule, type SourceConfig, type UploadHistoryEntry,
  type TimezoneValue, type Rounding,
} from './api';

const TOASTER_ID = 'main-toaster';

function applyRounding(value: number, rounding: Rounding): number {
  switch (rounding) {
    case 'integer': return Math.round(value);
    case 'one_decimal': return Math.round(value * 10) / 10;
    case 'two_decimals': return Math.round(value * 100) / 100;
    default: return value;
  }
}

function formatRounding(rounding: Rounding | string | null | undefined): string {
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
 */
function getDayRange(date: Date, tz: string) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  const approx = new Date(Date.UTC(y, m, d, 12));
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

function sortDevicesByName(a: Device, b: Device): number {
  const an = (a.nickname || a.deviceid).toLowerCase();
  const bn = (b.nickname || b.deviceid).toLowerCase();
  return an.localeCompare(bn);
}

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

  useEffect(() => { setHighlightIdx(0); }, [filtered]);

  useEffect(() => {
    if (open) {
      setSearch('');
      setHighlightIdx(0);
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [open]);

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

/**
 * A reusable section for configuring one energy source (production or waste).
 */
function SourceSection({
  title,
  description,
  enabled,
  onEnabledChange,
  deviceId,
  onDeviceChange,
  divisor,
  onDivisorChange,
  rounding,
  onRoundingChange,
  devices,
  energy,
  loadingEnergy,
  computedLabel,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onEnabledChange: (v: boolean) => void;
  deviceId: string;
  onDeviceChange: (id: string) => void;
  divisor: number;
  onDivisorChange: (n: number) => void;
  rounding: Rounding;
  onRoundingChange: (r: Rounding) => void;
  devices: Device[];
  energy: number | null;
  loadingEnergy: boolean;
  computedLabel: string;
}) {
  const computed = enabled && energy != null && divisor > 0 ? applyRounding(energy / divisor, rounding) : null;
  return (
    <div className={`rounded-md border p-4 ${enabled ? 'border-muted' : 'border-muted opacity-70'}`}>
      <FlexColumn spacing={3}>
        <FlexRow className="items-center justify-between">
          <FlexColumn spacing={0}>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </FlexColumn>
          <Switch checked={enabled} onCheckedChange={onEnabledChange} />
        </FlexRow>

        {enabled && (
          <>
            <div>
              <Label className="mb-1.5 block text-sm">Source device (pull energy from)</Label>
              <DevicePicker
                devices={devices}
                value={deviceId}
                onChange={onDeviceChange}
                placeholder="Select source device"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block text-sm">Divide energy by</Label>
                <NumberInput
                  value={Number.isFinite(divisor) ? divisor : ''}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    onDivisorChange(Number.isFinite(n) ? n : 0);
                  }}
                  min={0.01}
                  step={1}
                />
              </div>
              <div>
                <Label className="mb-1.5 block text-sm">Rounding</Label>
                <Select value={rounding} onValueChange={(v) => onRoundingChange(v as Rounding)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No rounding (raw)</SelectItem>
                    <SelectItem value="integer">Round to integer</SelectItem>
                    <SelectItem value="one_decimal">1 decimal place</SelectItem>
                    <SelectItem value="two_decimals">2 decimal places</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {deviceId && (
              <div className="rounded-sm border border-muted bg-background-accent p-3 text-sm">
                {loadingEnergy ? (
                  <FlexRow spacing={2} className="items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </FlexRow>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-muted-foreground text-xs">Total Energy</p>
                      <p className="font-medium text-foreground">
                        {energy != null ? `${energy.toFixed(4)} kWh` : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{computedLabel} (÷ {divisor})</p>
                      <p className="font-semibold text-primary">
                        {computed != null ? computed : '—'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </FlexColumn>
    </div>
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

  useEffect(() => {
    if (session?.username) {
      posthog.identify(session.username);
    }
  }, [session?.username]);

  // Settings
  const [defaultDivisor, setDefaultDivisor] = useState(() => getSettings().default_divisor);
  const [appTimezone, setAppTimezone] = useState<TimezoneValue>(() => getSettings().timezone ?? DEFAULT_TIMEZONE);

  // Manual entry: target + date + timezone
  const [targetDeviceId, setTargetDeviceId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(getYesterday());
  const [entryTimezone, setEntryTimezone] = useState<TimezoneValue>(appTimezone);
  const [creatingEntry, setCreatingEntry] = useState(false);

  // Manual entry: production source
  const [prodEnabled, setProdEnabled] = useState(true);
  const [prodDeviceId, setProdDeviceId] = useState('');
  const [prodDivisor, setProdDivisor] = useState(defaultDivisor);
  const [prodRounding, setProdRounding] = useState<Rounding>('integer');

  // Manual entry: waste source
  const [wasteEnabled, setWasteEnabled] = useState(true);
  const [wasteDeviceId, setWasteDeviceId] = useState('');
  const [wasteDivisor, setWasteDivisor] = useState(defaultDivisor);
  const [wasteRounding, setWasteRounding] = useState<Rounding>('integer');

  // Preview energy map: deviceid -> total energy
  const [previewEnergyMap, setPreviewEnergyMap] = useState<Record<string, number | null>>({});
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

  // Schedule form
  const [schedTargetDevice, setSchedTargetDevice] = useState('');
  const [schedFrequency, setSchedFrequency] = useState<'daily' | 'weekly'>('daily');
  const [schedTime, setSchedTime] = useState('06:00');
  const [schedTimezone, setSchedTimezone] = useState<TimezoneValue>(appTimezone);
  const [schedProdEnabled, setSchedProdEnabled] = useState(true);
  const [schedProdDeviceId, setSchedProdDeviceId] = useState('');
  const [schedProdDivisor, setSchedProdDivisor] = useState<number>(defaultDivisor);
  const [schedProdRounding, setSchedProdRounding] = useState<Rounding>('integer');
  const [schedWasteEnabled, setSchedWasteEnabled] = useState(true);
  const [schedWasteDeviceId, setSchedWasteDeviceId] = useState('');
  const [schedWasteDivisor, setSchedWasteDivisor] = useState<number>(defaultDivisor);
  const [schedWasteRounding, setSchedWasteRounding] = useState<Rounding>('integer');
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

  const deviceName = (id: string | null | undefined) =>
    id ? (deviceMap.get(id)?.nickname ?? id) : '—';

  // Fetch energy preview when date/timezone changes, for whichever source devices are enabled.
  useEffect(() => {
    if (!selectedDate) {
      setPreviewEnergyMap({});
      return;
    }
    const devicesToFetch = new Set<string>();
    if (prodEnabled && prodDeviceId) devicesToFetch.add(prodDeviceId);
    if (wasteEnabled && wasteDeviceId) devicesToFetch.add(wasteDeviceId);
    if (devicesToFetch.size === 0) {
      setPreviewEnergyMap({});
      return;
    }

    let cancelled = false;
    async function loadPreview() {
      setLoadingPreview(true);
      try {
        const range = getDayRange(selectedDate!, entryTimezone);
        const data = await fetchEnergy(range.fromTs, range.toTs);
        if (cancelled) return;
        const map: Record<string, number | null> = {};
        for (const id of devicesToFetch) {
          const row = data.find((d) => d.deviceid === id);
          map[id] = row?.energy.total ?? null;
        }
        setPreviewEnergyMap(map);
      } catch {
        if (!cancelled) setPreviewEnergyMap({});
      } finally {
        if (!cancelled) setLoadingPreview(false);
      }
    }
    loadPreview();
    return () => { cancelled = true; };
  }, [selectedDate, entryTimezone, prodEnabled, prodDeviceId, wasteEnabled, wasteDeviceId]);

  const prodEnergy = prodEnabled && prodDeviceId ? (previewEnergyMap[prodDeviceId] ?? null) : null;
  const wasteEnergy = wasteEnabled && wasteDeviceId ? (previewEnergyMap[wasteDeviceId] ?? null) : null;
  const prodValue = prodEnergy != null && prodDivisor > 0
    ? applyRounding(prodEnergy / prodDivisor, prodRounding) : null;
  const wasteValue = wasteEnergy != null && wasteDivisor > 0
    ? applyRounding(wasteEnergy / wasteDivisor, wasteRounding) : null;

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

  const canCreateEntry =
    !!targetDeviceId &&
    !!selectedDate &&
    ((prodEnabled && !!prodDeviceId && prodDivisor > 0) ||
     (wasteEnabled && !!wasteDeviceId && wasteDivisor > 0));

  const handleCreateEntry = async () => {
    if (!canCreateEntry || !selectedDate) return;
    setCreatingEntry(true);
    try {
      const range = getDayRange(selectedDate, entryTimezone);
      const prodLeg = prodEnabled && prodDeviceId && prodValue != null
        ? {
            value: prodValue,
            energy: prodEnergy,
            source: { device_id: prodDeviceId, divisor: prodDivisor, rounding: prodRounding } as SourceConfig,
          }
        : null;
      const wasteLeg = wasteEnabled && wasteDeviceId && wasteValue != null
        ? {
            value: wasteValue,
            energy: wasteEnergy,
            source: { device_id: wasteDeviceId, divisor: wasteDivisor, rounding: wasteRounding } as SourceConfig,
          }
        : null;

      if (!prodLeg && !wasteLeg) {
        toastFor(TOASTER_ID).error('No energy data available for the selected source(s).');
        return;
      }

      const result = await createProductionEntry(
        targetDeviceId, range.fromUnix, range.toUnix, prodLeg, wasteLeg, entryTimezone,
      );

      if (result.ok) {
        toastFor(TOASTER_ID).success(`Production entry created (${result.status}).`);
        loadUploadHistory();
      } else {
        toastFor(TOASTER_ID).error(`SAFI error (${result.status}): ${result.error}`, {
          duration: Infinity,
          closeButton: true,
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [energyDate]);

  const enrichedEnergy = useMemo(() => {
    return energy.map((e) => ({
      ...e,
      nickname: deviceMap.get(e.deviceid)?.nickname ?? e.deviceid,
    }));
  }, [energy, deviceMap]);

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
          const tgt = deviceName(e.target_device_id).toLowerCase();
          const prodSrc = deviceName(e.production_source?.device_id).toLowerCase();
          const wasteSrc = deviceName(e.waste_source?.device_id).toLowerCase();
          return tgt.includes(q) || prodSrc.includes(q) || wasteSrc.includes(q);
        })
      : uploadHistory;
    const dir = historySortDir === 'asc' ? 1 : -1;
    const keyFns: Record<string, (e: UploadHistoryEntry) => string | number> = {
      target: (e) => deviceName(e.target_device_id).toLowerCase(),
      date: (e) => Number(e.from_ts) || 0,
      production: (e) => e.production_value ?? -Infinity,
      waste: (e) => e.waste_value ?? -Infinity,
      created: (e) => new Date(e.created_at).getTime(),
    };
    const keyFn = keyFns[historySortBy] ?? keyFns.created;
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

  const canCreateSchedule =
    !!schedTargetDevice &&
    ((schedProdEnabled && !!schedProdDeviceId && schedProdDivisor > 0) ||
     (schedWasteEnabled && !!schedWasteDeviceId && schedWasteDivisor > 0));

  const handleCreateSchedule = async () => {
    if (!canCreateSchedule) return;
    setCreatingSched(true);
    try {
      const production_source: SourceConfig | null =
        schedProdEnabled && schedProdDeviceId
          ? { device_id: schedProdDeviceId, divisor: schedProdDivisor, rounding: schedProdRounding }
          : null;
      const waste_source: SourceConfig | null =
        schedWasteEnabled && schedWasteDeviceId
          ? { device_id: schedWasteDeviceId, divisor: schedWasteDivisor, rounding: schedWasteRounding }
          : null;

      const sched = await createSchedule({
        target_device_id: schedTargetDevice,
        production_source,
        waste_source,
        frequency: schedFrequency,
        time: schedTime,
        timezone: schedTimezone,
        enabled: true,
      });
      setSchedules((prev) => [...prev, sched]);
      setSchedTargetDevice('');
      setSchedProdDeviceId('');
      setSchedWasteDeviceId('');
      setSchedTime('06:00');
      setSchedTimezone(appTimezone);
      setSchedProdDivisor(defaultDivisor);
      setSchedWasteDivisor(defaultDivisor);
      setSchedProdRounding('integer');
      setSchedWasteRounding('integer');
      toastFor(TOASTER_ID).success('Schedule created!');
    } catch (err) {
      toastFor(TOASTER_ID).error((err as Error).message || 'Failed to create schedule.');
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
        toastFor(TOASTER_ID).error(`Skipped: ${result.reason === 'no_energy_data' ? 'No energy data for source device(s)' : result.reason}`);
      } else if (result.error) {
        toastFor(TOASTER_ID).error(`SAFI error (${result.status}): ${result.error}`, {
          duration: Infinity,
          closeButton: true,
        });
      } else {
        const parts: string[] = [];
        if (result.production_value != null) parts.push(`production=${result.production_value}`);
        if (result.waste_value != null) parts.push(`waste=${result.waste_value}`);
        toastFor(TOASTER_ID).success(`Entry created! ${parts.join(', ')}`);
      }
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
    setProdDivisor(settingsDivisor);
    setWasteDivisor(settingsDivisor);
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

  const formatSource = (src: SourceConfig | null): string => {
    if (!src) return 'off';
    return `${deviceName(src.device_id)} ÷${src.divisor}`;
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
                Pull energy from up to two source devices and map each to production quantity or waste quantity on a target device.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FlexColumn spacing={4}>
                {/* Target + date + timezone */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <Label className="mb-1.5 block text-sm">Target device (create entry for)</Label>
                    <DevicePicker
                      devices={devices}
                      value={targetDeviceId}
                      onChange={setTargetDeviceId}
                      placeholder="Select target device"
                    />
                  </div>
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
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {TIMEZONE_OPTIONS.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Two source sections side-by-side */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <SourceSection
                    title="Production source"
                    description="Populates production_qty"
                    enabled={prodEnabled}
                    onEnabledChange={setProdEnabled}
                    deviceId={prodDeviceId}
                    onDeviceChange={setProdDeviceId}
                    divisor={prodDivisor}
                    onDivisorChange={setProdDivisor}
                    rounding={prodRounding}
                    onRoundingChange={setProdRounding}
                    devices={devices}
                    energy={prodEnergy}
                    loadingEnergy={loadingPreview}
                    computedLabel="Production qty"
                  />
                  <SourceSection
                    title="Waste source"
                    description="Populates waste_qty"
                    enabled={wasteEnabled}
                    onEnabledChange={setWasteEnabled}
                    deviceId={wasteDeviceId}
                    onDeviceChange={setWasteDeviceId}
                    divisor={wasteDivisor}
                    onDivisorChange={setWasteDivisor}
                    rounding={wasteRounding}
                    onRoundingChange={setWasteRounding}
                    devices={devices}
                    energy={wasteEnergy}
                    loadingEnergy={loadingPreview}
                    computedLabel="Waste qty"
                  />
                </div>

                {/* Combined preview */}
                {(prodEnabled || wasteEnabled) && targetDeviceId && selectedDate && (
                  <div className="rounded-md border border-muted bg-background-accent p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Entry preview
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                      <div>
                        <p className="text-muted-foreground">Target</p>
                        <p className="font-medium text-foreground">{deviceName(targetDeviceId)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-medium text-foreground">{getDayRange(selectedDate, entryTimezone).label}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">production_qty</p>
                        <p className="font-semibold text-primary">
                          {prodValue != null ? prodValue : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">waste_qty</p>
                        <p className="font-semibold text-primary">
                          {wasteValue != null ? wasteValue : '—'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Button
                    color="primary"
                    onClick={handleCreateEntry}
                    loading={creatingEntry}
                    disabled={!canCreateEntry}
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                </div>

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
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {displayedEnergy.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-6">
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
                            <SortableHead label="Target" columnId="target" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} />
                            <SortableHead label="Date" columnId="date" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} />
                            <TableHead>Production from</TableHead>
                            <SortableHead label="production_qty" columnId="production" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} align="right" />
                            <TableHead>Waste from</TableHead>
                            <SortableHead label="waste_qty" columnId="waste" sortBy={historySortBy} sortDir={historySortDir} onSort={handleHistorySort} align="right" />
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {displayedHistory.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={9} className="text-center text-sm text-muted-foreground py-6">
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
                                {deviceName(entry.target_device_id)}
                              </TableCell>
                              <TableCell className="text-sm">
                                {formatTs(entry.from_ts)}
                              </TableCell>
                              <TableCell className="text-sm">
                                {entry.production_source
                                  ? `${deviceName(entry.production_source.device_id)} ÷${entry.production_source.divisor}`
                                  : <span className="text-muted-foreground">—</span>}
                              </TableCell>
                              <TableCell className="text-right font-semibold text-primary">
                                {entry.production_value != null ? entry.production_value : '—'}
                              </TableCell>
                              <TableCell className="text-sm">
                                {entry.waste_source
                                  ? `${deviceName(entry.waste_source.device_id)} ÷${entry.waste_source.divisor}`
                                  : <span className="text-muted-foreground">—</span>}
                              </TableCell>
                              <TableCell className="text-right font-semibold text-primary">
                                {entry.waste_value != null ? entry.waste_value : '—'}
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
                      Automate pulling energy from up to two source devices and creating a production entry
                      on the target device each day or week.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FlexColumn spacing={4}>
                      {/* Target + frequency + time + timezone */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <Label className="mb-1.5 block text-sm">Target device</Label>
                          <DevicePicker
                            devices={devices}
                            value={schedTargetDevice}
                            onChange={setSchedTargetDevice}
                            placeholder="Create entry for..."
                          />
                        </div>
                        <div>
                          <Label className="mb-1.5 block text-sm">Frequency</Label>
                          <Select value={schedFrequency} onValueChange={(v) => setSchedFrequency(v as typeof schedFrequency)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
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
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {TIMEZONE_OPTIONS.map((tz) => (
                                <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <SourceSection
                          title="Production source"
                          description="Populates production_qty"
                          enabled={schedProdEnabled}
                          onEnabledChange={setSchedProdEnabled}
                          deviceId={schedProdDeviceId}
                          onDeviceChange={setSchedProdDeviceId}
                          divisor={schedProdDivisor}
                          onDivisorChange={setSchedProdDivisor}
                          rounding={schedProdRounding}
                          onRoundingChange={setSchedProdRounding}
                          devices={devices}
                          energy={null}
                          loadingEnergy={false}
                          computedLabel="Production qty"
                        />
                        <SourceSection
                          title="Waste source"
                          description="Populates waste_qty"
                          enabled={schedWasteEnabled}
                          onEnabledChange={setSchedWasteEnabled}
                          deviceId={schedWasteDeviceId}
                          onDeviceChange={setSchedWasteDeviceId}
                          divisor={schedWasteDivisor}
                          onDivisorChange={setSchedWasteDivisor}
                          rounding={schedWasteRounding}
                          onRoundingChange={setSchedWasteRounding}
                          devices={devices}
                          energy={null}
                          loadingEnergy={false}
                          computedLabel="Waste qty"
                        />
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
                      </div>

                      {schedTargetDevice && (schedProdEnabled || schedWasteEnabled) && (
                        <div className="rounded-md border border-muted bg-background-accent p-3 text-sm">
                          <p className="text-muted-foreground">
                            <strong className="text-foreground">Preview:</strong>{' '}
                            Every {schedFrequency === 'daily' ? 'day' : 'week'} at{' '}
                            {schedTime} {TIMEZONE_OPTIONS.find(t => t.value === schedTimezone)?.label ?? schedTimezone},
                            create a production entry on{' '}
                            <strong className="text-foreground">{deviceName(schedTargetDevice)}</strong> with{' '}
                            {schedProdEnabled && schedProdDeviceId && (
                              <>
                                production_qty from{' '}
                                <strong className="text-foreground">{deviceName(schedProdDeviceId)}</strong>{' '}
                                (÷{schedProdDivisor}
                                {schedProdRounding !== 'none' && `, ${formatRounding(schedProdRounding).toLowerCase()}`})
                              </>
                            )}
                            {schedProdEnabled && schedProdDeviceId && schedWasteEnabled && schedWasteDeviceId && ' and '}
                            {schedWasteEnabled && schedWasteDeviceId && (
                              <>
                                waste_qty from{' '}
                                <strong className="text-foreground">{deviceName(schedWasteDeviceId)}</strong>{' '}
                                (÷{schedWasteDivisor}
                                {schedWasteRounding !== 'none' && `, ${formatRounding(schedWasteRounding).toLowerCase()}`})
                              </>
                            )}
                            .
                          </p>
                        </div>
                      )}

                      <div>
                        <Button
                          color="primary"
                          onClick={handleCreateSchedule}
                          loading={creatingSched}
                          disabled={!canCreateSchedule}
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
                                  → {deviceName(sched.target_device_id)}
                                </span>
                                <Badge variant={sched.enabled ? 'success' : 'outline'}>
                                  {sched.enabled ? 'Active' : 'Paused'}
                                </Badge>
                              </FlexRow>
                              <p className="ml-6 text-xs text-muted-foreground">
                                {sched.frequency.charAt(0).toUpperCase() + sched.frequency.slice(1)} at {sched.time} {TIMEZONE_OPTIONS.find(t => t.value === sched.timezone)?.label ?? sched.timezone ?? 'PT'}
                              </p>
                              <p className="ml-6 text-xs text-muted-foreground">
                                <span className="font-medium">production_qty:</span> {formatSource(sched.production_source)}
                                {sched.production_source && sched.production_source.rounding !== 'none' && ` · ${formatRounding(sched.production_source.rounding).toLowerCase()}`}
                              </p>
                              <p className="ml-6 text-xs text-muted-foreground">
                                <span className="font-medium">waste_qty:</span> {formatSource(sched.waste_source)}
                                {sched.waste_source && sched.waste_source.rounding !== 'none' && ` · ${formatRounding(sched.waste_source.rounding).toLowerCase()}`}
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
                        Energy is divided by this number to calculate quantities. Used as the default for new entries and schedules.
                      </p>
                    </div>
                    <div className="max-w-xs">
                      <Label className="mb-1.5 block text-sm">Default timezone</Label>
                      <Select value={settingsTimezone} onValueChange={(v) => setSettingsTimezone(v as TimezoneValue)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {TIMEZONE_OPTIONS.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Default timezone for new entries and schedules.
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
