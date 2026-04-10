# CLAUDE.md — Guidewheel Application

## Project Context

This is a Guidewheel internal application built with React + TypeScript + Vite + Tailwind CSS.

It uses the **@guidewheel/ui** component library for all UI. You MUST use components from this library instead of writing raw HTML for buttons, inputs, dialogs, tooltips, chips, layout containers, and other UI elements the library provides.

## Setup Verification

If the project is correctly configured, all of the following are true:

1. `@guidewheel/ui` is in `package.json` dependencies
2. `tailwind.config.ts` includes `presets: [guidewheelPreset]` and content path `./node_modules/@guidewheel/ui/dist/**/*.{js,mjs}`
3. Root CSS file imports `@guidewheel/ui/tokens` and `@guidewheel/ui/styles.css`
4. `npm run dev` starts without errors
5. If using charts: `echarts`, `echarts-for-react` are in `package.json` dependencies and chart components are imported from `@guidewheel/ui/chart`
6. If using date pickers: `react-day-picker` (v9) is in `package.json` dependencies

---

## Available Components

| Category | Component | Import Path |
|----------|-----------|-------------|
| **Primitives** | Button, DisclosureTrigger | `@guidewheel/ui/button` |
| | Input, NumberInput | `@guidewheel/ui/input` |
| | Textarea | `@guidewheel/ui/textarea` |
| | Checkbox | `@guidewheel/ui/checkbox` |
| | Switch | `@guidewheel/ui/switch` |
| | Toggle, ToggleGroup | `@guidewheel/ui/toggle` |
| | Label | `@guidewheel/ui/label` |
| | Link | `@guidewheel/ui/link` |
| | Chip, TagChip, ToggleChip | `@guidewheel/ui/chip` |
| | Separator | `@guidewheel/ui/separator` |
| | Badge | `@guidewheel/ui/badge` |
| | Skeleton | `@guidewheel/ui/skeleton` |
| | Avatar | `@guidewheel/ui/avatar` |
| | Progress | `@guidewheel/ui/progress` |
| | Banner | `@guidewheel/ui/banner` |
| **Composition** | Dialog | `@guidewheel/ui/dialog` |
| | AlertDialog | `@guidewheel/ui/alert-dialog` |
| | Drawer | `@guidewheel/ui/drawer` |
| | Tabs | `@guidewheel/ui/tabs` |
| | Card | `@guidewheel/ui/card` |
| | Table | `@guidewheel/ui/table` |
| | Select | `@guidewheel/ui/select` |
| | Accordion | `@guidewheel/ui/accordion` |
| | DropdownMenu | `@guidewheel/ui/dropdown-menu` |
| | RadioGroup | `@guidewheel/ui/radio-group` |
| | EmptyState | `@guidewheel/ui/empty-state` |
| | Tooltip | `@guidewheel/ui/tooltip` |
| | Popover | `@guidewheel/ui/popover` |
| | Toaster | `@guidewheel/ui/toaster` |
| | Field | `@guidewheel/ui/field` |
| | Breadcrumb | `@guidewheel/ui/breadcrumb` |
| | Tile | `@guidewheel/ui/tile` |
| **Composites** | SearchInput | `@guidewheel/ui/search-input` |
| | DatePicker | `@guidewheel/ui/date-picker` |
| | DateRangePicker | `@guidewheel/ui/date-range-picker` |
| | StatusIndicator | `@guidewheel/ui/status-indicator` |
| | MetricTile | `@guidewheel/ui/metric-tile` |
| | MetricCard | `@guidewheel/ui/metric-card` |
| | DataTable | `@guidewheel/ui/data-table` |
| | CardList | `@guidewheel/ui/card-list` |
| | TimeSegment | `@guidewheel/ui/time-segment` |
| | NavigationSidebar | `@guidewheel/ui/navigation-sidebar` |
| | AppBar | `@guidewheel/ui/app-bar` |
| | CommentThread | `@guidewheel/ui/comment-thread` |
| | FilterBar | `@guidewheel/ui/filter-bar` |
| | Menu | `@guidewheel/ui/menu` |
| **Layout** | MainContent, PageSection, Frame, Box, Flex, FlexRow, FlexColumn | `@guidewheel/ui/layout` |
| | ScrollBox, ScrollBoxShadowContainer | `@guidewheel/ui/scrollbox` |
| | Overlay, OverlayContent | `@guidewheel/ui/overlay` |
| **Chart** | HChart | `@guidewheel/ui/chart` |
| | GanttChart | `@guidewheel/ui/chart` |
| **Icons** | All icons | `@guidewheel/ui/icons` |
| **Assets** | GuidewheelLogo, GuidewheelCircle, HappyGuidewheelCircles | `@guidewheel/ui/assets` |

---

## Rules

1. **Always import from `@guidewheel/ui/*` subpaths** (e.g. `@guidewheel/ui/button`, never `@guidewheel/ui/dist/...` or relative paths into node_modules)
2. **Always use Tailwind classes from the preset** — colors like `text-primary`, `bg-surface`, `border-muted` are available via the preset. Do not hardcode hex colors.
3. **Always import CSS tokens** — The root CSS must have `@import '@guidewheel/ui/tokens'` and `@import '@guidewheel/ui/styles.css'`
4. **Never install competing UI libraries** (no MUI, Chakra, Ant Design, shadcn, DaisyUI). All UI comes from `@guidewheel/ui`.
5. **Use composition patterns** for multi-part components (AlertDialog, Dialog, Drawer, Tabs, Card, Table, Select, Accordion, DropdownMenu, Field, Tooltip, Popover, Breadcrumb, Tile, EmptyState). See the composition patterns section below.
6. **Toaster requires an ID** — every `<Toaster>` must have a unique `id` prop. Use `toastFor(id)` to send toasts.
7. **Icons use the IconProvider context** — Button already wraps children in IconProvider. Outside of Button, wrap icon containers in `<IconProvider value={{ size: "sm" }}>`.
8. **Chart components use a separate entry point** — import from `@guidewheel/ui/chart`, not `@guidewheel/ui/chart/HChart`. Requires `echarts` and `echarts-for-react` as peer dependencies.
9. **DatePicker/DateRangePicker require react-day-picker** — `react-day-picker` (v9) must be installed as a peer dependency.

---

## Component Catalog

### Button

```
Import: import { Button } from '@guidewheel/ui/button'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'solid' \| 'text'` | `'solid'` | Filled or borderless style |
| color | `'default' \| 'primary' \| 'secondary' \| 'danger'` | `'default'` | Color scheme |
| size | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Size preset |
| loading | `boolean` | `false` | Shows spinner, disables interaction |
| asChild | `boolean` | `false` | Merge props onto child element (Radix Slot) |

```tsx
<Button color="primary" size="md">Save Changes</Button>
<Button variant="text" color="danger">Delete</Button>
<Button loading>Saving...</Button>
<Button size="icon"><EditIcon /></Button>
```

### DisclosureTrigger

```
Import: import { DisclosureTrigger } from '@guidewheel/ui/button'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |

Button with chevron indicator for Popover/Dialog/Select triggers. Responds to Radix `data-state` attribute.

```tsx
<PopoverTrigger asChild>
  <DisclosureTrigger>Select option</DisclosureTrigger>
</PopoverTrigger>
```

### Input

```
Import: import { Input } from '@guidewheel/ui/input'
```

Standard HTML `<input>` with Guidewheel styling. Accepts all native input props.

```tsx
<Input type="email" placeholder="you@company.com" />
```

### NumberInput

```
Import: import { NumberInput } from '@guidewheel/ui/input'
```

Numeric input with hidden browser spin buttons. Accepts all native input props.

```tsx
<NumberInput min={0} max={100} step={1} />
```

### Textarea

```
Import: import { Textarea } from '@guidewheel/ui/textarea'
```

A multi-line text input field styled to match the Input component. Accepts all native `<textarea>` props. Default min-height is `min-h-20` with vertical resize enabled.

```tsx
<Textarea placeholder="Enter your message..." rows={4} />
```

### Checkbox

```
Import: import { Checkbox } from '@guidewheel/ui/checkbox'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'md' \| 'lg'` | `'md'` | Checkbox size |
| checked | `boolean \| 'indeterminate'` | — | Controlled checked state |
| onCheckedChange | `(checked: boolean \| 'indeterminate') => void` | — | Change handler |

```tsx
<Checkbox checked={agreed} onCheckedChange={setAgreed} />
```

### Switch

```
Import: import { Switch } from '@guidewheel/ui/switch'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| checked | `boolean` | — | Controlled state |
| onCheckedChange | `(checked: boolean) => void` | — | Change handler |

```tsx
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

### Toggle

```
Import: import { Toggle, ToggleIndicator } from '@guidewheel/ui/toggle'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Toggle size |
| pressed | `boolean` | — | Controlled pressed state |
| onPressedChange | `(pressed: boolean) => void` | — | Change handler |

```tsx
<Toggle pressed={active} onPressedChange={setActive}>
  <ToggleIndicator />
  Enable notifications
</Toggle>
```

### ToggleGroup / ToggleGroupItem

```
Import: import { ToggleGroup, ToggleGroupItem } from '@guidewheel/ui/toggle'
```

| Prop (ToggleGroup) | Type | Default | Description |
|---------------------|------|---------|-------------|
| type | `'single' \| 'multiple'` | — | Selection mode (required) |
| variant | `'default' \| 'outline'` | `'default'` | Visual style |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Item size |
| spacing | `number` | `0` | Gap between items (spacing units) |
| orientation | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |

```tsx
<ToggleGroup type="single" value={view} onValueChange={setView} variant="outline">
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
</ToggleGroup>
```

### Label

```
Import: import { Label } from '@guidewheel/ui/label'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Text size |

```tsx
<Label htmlFor="name" size="sm">Full Name</Label>
```

### Link

```
Import: import { Link } from '@guidewheel/ui/link'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| asChild | `boolean` | `false` | Merge onto child (use with router Link) |

```tsx
<Link href="/settings">Settings</Link>
```

### Chip

```
Import: import { Chip } from '@guidewheel/ui/chip'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md'` | `'md'` | Chip size |

```tsx
<Chip size="sm">Active</Chip>
```

### TagChip

```
Import: import { TagChip } from '@guidewheel/ui/chip'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'sm' \| 'md'` | `'md'` | Chip size |
| color | `string` | — | CSS color for status dot (any valid CSS color) |

```tsx
<TagChip color="var(--load-state-runtime)">Running</TagChip>
<TagChip color="#52C41A">Online</TagChip>
```

### ToggleChip

```
Import: import { ToggleChip } from '@guidewheel/ui/chip'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| pressed | `boolean` | — | Whether chip shows as active |
| size | `'sm' \| 'md'` | `'md'` | Chip size |

Non-interactive chip showing on/off state. Use Toggle for interactivity.

```tsx
<ToggleChip pressed={isSelected}>Filter A</ToggleChip>
```

### Badge

```
Import: import { Badge } from '@guidewheel/ui/badge'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'outline'` | `'default'` | Color/style variant |
| size | `'sm' \| 'md'` | `'md'` | Badge size |

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="danger" size="sm">Error</Badge>
<Badge variant="outline">Draft</Badge>
```

Notes:
- Renders as a `<span>` with rounded-full shape
- `default` uses primary color, `secondary` uses surface color
- `success`, `warning`, `danger` use semantic color scales

### Skeleton

```
Import: import { Skeleton } from '@guidewheel/ui/skeleton'
```

An animated loading placeholder with a pulse animation. Use `className` to control dimensions.

```tsx
<Skeleton className="h-4 w-48" />
<Skeleton className="h-12 w-full rounded-lg" />
```

Notes:
- No props beyond standard `div` props — control size entirely through className
- Uses `bg-surface` background with `animate-pulse`
- Use `rounded-md` (default) or override with `rounded-lg`, `rounded-full`, etc.

### Avatar

```
Import: import { Avatar, AvatarImage, AvatarFallback } from '@guidewheel/ui/avatar'
```

| Prop (Avatar) | Type | Default | Description |
|---------------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Avatar size (sm=32px, md=40px, lg=48px) |

Sub-components:
- **AvatarImage** — `<img>` that auto-hides on load error. Accepts `onLoadError` callback.
- **AvatarFallback** — Shown when image fails or is absent. Typically initials.

```tsx
<Avatar size="lg">
  <AvatarImage src="/photo.jpg" alt="Jane Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

Notes:
- Always provide `AvatarFallback` — it shows when image URL is missing or fails to load
- AvatarImage automatically hides itself on error (no flash of broken image)

### Progress

```
Import: import { Progress, ProgressIndicator } from '@guidewheel/ui/progress'
```

| Prop (Progress) | Type | Default | Description |
|-----------------|------|---------|-------------|
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Bar height (sm=6px, md=10px, lg=16px) |
| value | `number \| null` | — | Completion percentage (0-100) |

Sub-components:
- **ProgressIndicator** — The filled portion. Auto-rendered if no children are provided.

```tsx
<Progress value={75} size="md" />
<Progress value={50} size="lg">
  <ProgressIndicator value={50} className="bg-success" />
</Progress>
```

Notes:
- Default indicator uses `bg-primary` color
- Override indicator color by passing children with custom className
- Built on Radix Progress primitive

### Banner

```
Import: import { Banner } from '@guidewheel/ui/banner'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Semantic color scheme |
| dismissible | `boolean` | `false` | Shows a close button |
| onDismiss | `() => void` | — | Callback fired when banner is dismissed |

```tsx
<Banner variant="warning" dismissible onDismiss={() => console.log('dismissed')}>
  Your trial expires in 3 days.
</Banner>
<Banner variant="success">Changes saved successfully.</Banner>
```

Notes:
- Self-managing dismiss state — once dismissed, returns `null`
- Uses `role="status"` for accessibility
- Each variant has distinct background, border, and text colors

### Separator

```
Import: import Separator from '@guidewheel/ui/separator'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| orientation | `'horizontal' \| 'vertical'` | `'horizontal'` | Line direction |
| decorative | `boolean` | `true` | If true, hidden from screen readers |

```tsx
<Separator />
<Separator orientation="vertical" />
```

### ScrollBox / ScrollBoxShadowContainer

```
Import: import { ScrollBox, ScrollBoxShadowContainer } from '@guidewheel/ui/scrollbox'
```

ScrollBox provides styled overflow scrolling. Wrap in ScrollBoxShadowContainer for a fade-out effect at the bottom.

```tsx
<ScrollBoxShadowContainer>
  <ScrollBox className="max-h-64">
    {/* scrollable content */}
  </ScrollBox>
</ScrollBoxShadowContainer>
```

### Overlay / OverlayContent

```
Import: import { Overlay, OverlayContent } from '@guidewheel/ui/overlay'
```

| Prop (Overlay) | Type | Default | Description |
|----------------|------|---------|-------------|
| open | `boolean` | `false` | Whether overlay is visible |

Blocking overlay that dims background. Use for loading states.

```tsx
<Overlay open={isLoading}>
  <OverlayContent>Loading...</OverlayContent>
</Overlay>
```

---

## Composition Patterns

These components use multiple sub-components that must be composed together.

### Dialog

```
Import: import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose, DialogOverlay, DialogPortal } from '@guidewheel/ui/dialog'
```

| Prop (DialogContent) | Type | Default | Description |
|----------------------|------|---------|-------------|
| showClose | `boolean` | `true` | Whether to show the X close button |

Sub-components:
- **Dialog** — Root (Radix Dialog.Root). Controls open state.
- **DialogTrigger** — Button that opens the dialog. Supports `asChild`.
- **DialogContent** — Centered modal with overlay, portal, border, and animations. Max-width `sm:max-w-lg`.
- **DialogHeader** — Flex column for title and description.
- **DialogFooter** — Flex row (stacks on mobile) for action buttons.
- **DialogTitle** — Accessible title (renders `<h2>`).
- **DialogDescription** — Accessible description text.
- **DialogClose** — Programmatic close trigger. Supports `asChild`.
- **DialogOverlay** — Backdrop overlay (`bg-black/50`). Auto-included by DialogContent.
- **DialogPortal** — Portal wrapper. Auto-included by DialogContent.

Required structure:
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    {/* form content */}
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="text">Cancel</Button>
      </DialogClose>
      <Button color="primary">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Notes:
- DialogContent automatically includes overlay and portal
- Set `showClose={false}` to hide the default X button
- Use controlled mode with `open` and `onOpenChange` props on Dialog root

### Drawer

```
Import: import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose, DrawerOverlay, DrawerPortal } from '@guidewheel/ui/drawer'
```

| Prop (DrawerContent) | Type | Default | Description |
|----------------------|------|---------|-------------|
| side | `'left' \| 'right' \| 'bottom'` | `'right'` | Slide-in direction |

Sub-components:
- **Drawer** — Root (Radix Dialog.Root).
- **DrawerTrigger** — Open trigger. Supports `asChild`.
- **DrawerContent** — Slide-in panel. `right` = w-80 from right, `left` = w-80 from left, `bottom` = full-width from bottom (max 85vh).
- **DrawerHeader** — Flex column with padding for title area.
- **DrawerFooter** — Action buttons area.
- **DrawerTitle** — Accessible title.
- **DrawerDescription** — Accessible description.
- **DrawerClose** — Programmatic close. Supports `asChild`.
- **DrawerOverlay** — Backdrop (`bg-black/50`). Auto-included.
- **DrawerPortal** — Portal wrapper. Auto-included.

Required structure:
```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Details</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Device Details</DrawerTitle>
      <DrawerDescription>View and edit device settings.</DrawerDescription>
    </DrawerHeader>
    {/* content */}
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="text">Close</Button>
      </DrawerClose>
      <Button color="primary">Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

Notes:
- Built on Radix Dialog primitives with slide-in animations
- Always includes a close X button in top-right corner
- Bottom drawer has `rounded-t-lg` and max-height 85vh

### Tabs

```
Import: import { Tabs, TabsList, TabsTrigger, TabsContent } from '@guidewheel/ui/tabs'
```

| Prop (Tabs) | Type | Default | Description |
|-------------|------|---------|-------------|
| defaultValue | `string` | — | Initially active tab (uncontrolled) |
| value | `string` | — | Active tab (controlled) |
| onValueChange | `(value: string) => void` | — | Tab change handler |

Sub-components:
- **Tabs** — Root container.
- **TabsList** — Horizontal row of tab triggers with bottom border.
- **TabsTrigger** — Individual tab button. 44px min-height touch target. Active state shows primary bottom border.
- **TabsContent** — Panel shown when its tab is active. Has `pt-4` padding.

Required structure:
```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="metrics">Metrics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content here</TabsContent>
  <TabsContent value="metrics">Metrics content here</TabsContent>
  <TabsContent value="settings">Settings content here</TabsContent>
</Tabs>
```

Notes:
- Built on Radix Tabs primitives
- TabsTrigger uses `-mb-px` to overlap the TabsList border when active
- Inactive triggers show `text-muted-foreground`, active shows `text-foreground` with `border-primary`

### Card

```
Import: import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@guidewheel/ui/card'
```

Sub-components:
- **Card** — Container with `bg-card`, rounded corners, border, and `shadow-sm`.
- **CardHeader** — Flex column with `p-6` padding for title/description.
- **CardTitle** — `<h3>` with `text-lg font-semibold`.
- **CardDescription** — `<p>` with `text-sm text-muted-foreground`.
- **CardContent** — Content area with `p-6 pt-0`.
- **CardFooter** — Footer with `flex items-center p-6 pt-0`.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Machine Status</CardTitle>
    <CardDescription>Current operational metrics</CardDescription>
  </CardHeader>
  <CardContent>
    <p>OEE: 85%</p>
  </CardContent>
  <CardFooter>
    <Button variant="text">View Details</Button>
  </CardFooter>
</Card>
```

### Table

```
Import: import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from '@guidewheel/ui/table'
```

Sub-components:
- **Table** — Wrapped in a scrollable `div`. Full-width with `text-sm`.
- **TableHeader** — `<thead>` with bottom border on rows.
- **TableBody** — `<tbody>` with no border on last row.
- **TableFooter** — `<tfoot>` with top border and `bg-surface/50`.
- **TableRow** — `<tr>` with hover (`hover:bg-surface/50`) and selection (`data-[state=selected]:bg-surface`) states.
- **TableHead** — `<th>` with `h-10 px-3`, muted foreground.
- **TableCell** — `<td>` with `p-3 align-middle`.
- **TableCaption** — `<caption>` with muted foreground.

```tsx
<Table>
  <TableCaption>Recent machine events</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Machine</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">OEE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>CNC Mill #1</TableCell>
      <TableCell>Running</TableCell>
      <TableCell className="text-right">92%</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Select

```
Import: import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator } from '@guidewheel/ui/select'
```

Sub-components:
- **Select** — Root (Radix Select.Root). Accepts `value`, `onValueChange`, `defaultValue`.
- **SelectTrigger** — Button showing current selection with chevron icon. Height `h-9`.
- **SelectValue** — Placeholder/value display inside trigger.
- **SelectContent** — Dropdown panel. Renders in portal with animations. Default `position="popper"`.
- **SelectItem** — Individual option with check icon when selected.
- **SelectGroup** — Groups related items.
- **SelectLabel** — Non-selectable label for a group.
- **SelectSeparator** — Divider line between groups.

Required structure:
```tsx
<Select value={status} onValueChange={setStatus}>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Status</SelectLabel>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="idle">Idle</SelectItem>
      <SelectItem value="offline">Offline</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

Notes:
- Built on Radix Select — single value only (for multi-select, use Menu with `multiple`)
- SelectContent auto-sizes to trigger width via CSS custom property
- Disabled items use `data-[disabled]` attribute

### Accordion

```
Import: import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@guidewheel/ui/accordion'
```

| Prop (Accordion) | Type | Default | Description |
|------------------|------|---------|-------------|
| type | `'single' \| 'multiple'` | — | Single or multiple open items (required) |
| collapsible | `boolean` | `false` | Allow collapsing all items (single mode) |
| defaultValue | `string \| string[]` | — | Initially open item(s) |

Sub-components:
- **Accordion** — Root container (Radix Accordion.Root).
- **AccordionItem** — Container for one trigger/content pair. Requires `value` prop. Has bottom border.
- **AccordionTrigger** — Clickable header with auto-rotating chevron icon. Hover shows underline.
- **AccordionContent** — Collapsible content with open/close animations (`animate-accordion-down/up`).

```tsx
<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Machine Details</AccordionTrigger>
    <AccordionContent>
      <p>CNC Mill specifications and status information.</p>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Maintenance Log</AccordionTrigger>
    <AccordionContent>
      <p>Recent maintenance records.</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### DropdownMenu

```
Import: import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@guidewheel/ui/dropdown-menu'
```

Sub-components:
- **DropdownMenu** — Root (Radix DropdownMenu.Root).
- **DropdownMenuTrigger** — Open trigger. Supports `asChild`.
- **DropdownMenuContent** — Dropdown panel in portal. `sideOffset` defaults to 4.
- **DropdownMenuItem** — Clickable action item.
- **DropdownMenuCheckboxItem** — Item with checkbox (check icon indicator).
- **DropdownMenuRadioGroup** — Groups radio items.
- **DropdownMenuRadioItem** — Item with radio selection (check icon indicator).
- **DropdownMenuLabel** — Non-interactive section label.
- **DropdownMenuSeparator** — Divider line.
- **DropdownMenuSub** — Sub-menu root.
- **DropdownMenuSubTrigger** — Sub-menu trigger with right chevron.
- **DropdownMenuSubContent** — Sub-menu content panel.

Required structure:
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button size="icon" variant="text"><MoreHorizontalIcon /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => handleEdit()}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleDuplicate()}>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Plant A</DropdownMenuItem>
        <DropdownMenuItem>Plant B</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-danger" onClick={() => handleDelete()}>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### RadioGroup

```
Import: import { RadioGroup, RadioGroupItem } from '@guidewheel/ui/radio-group'
```

| Prop (RadioGroup) | Type | Default | Description |
|-------------------|------|---------|-------------|
| value | `string` | — | Controlled selected value |
| onValueChange | `(value: string) => void` | — | Change handler |
| defaultValue | `string` | — | Default selected value |
| orientation | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |

Sub-components:
- **RadioGroup** — Root container. Flex column with gap-2.
- **RadioGroupItem** — Individual radio button (16px circle). Shows primary-colored dot when selected.

```tsx
<RadioGroup value={selected} onValueChange={setSelected}>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="opt-1" />
    <Label htmlFor="opt-1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="opt-2" />
    <Label htmlFor="opt-2">Option 2</Label>
  </div>
</RadioGroup>
```

### EmptyState

```
Import: import { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription, EmptyStateAction } from '@guidewheel/ui/empty-state'
```

Sub-components:
- **EmptyState** — Centered flex column container with `py-12` padding.
- **EmptyStateIcon** — Icon wrapper with `text-muted-foreground`.
- **EmptyStateTitle** — `<h3>` with `text-lg font-semibold`.
- **EmptyStateDescription** — `<p>` with `text-sm text-muted-foreground max-w-sm`.
- **EmptyStateAction** — Container for action button(s).

```tsx
<EmptyState>
  <EmptyStateIcon><SearchIcon size="xl" /></EmptyStateIcon>
  <EmptyStateTitle>No machines found</EmptyStateTitle>
  <EmptyStateDescription>
    Try adjusting your filters or add a new machine.
  </EmptyStateDescription>
  <EmptyStateAction>
    <Button color="primary">Add Machine</Button>
  </EmptyStateAction>
</EmptyState>
```

### AlertDialog

```
Import: import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@guidewheel/ui/alert-dialog'
```

Required structure:
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button color="danger">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Confirm</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

Notes:
- AlertDialogAction renders as danger button by default
- AlertDialogCancel renders as default button by default
- Both accept `asChild` to use custom button components
- AlertDialogContent automatically includes overlay and portal

### Tooltip

```
Import: import { Tooltip, TooltipTrigger, TooltipContent } from '@guidewheel/ui/tooltip'
```

Required structure:
```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>Helpful text here</TooltipContent>
</Tooltip>
```

Notes:
- Tooltip automatically includes TooltipProvider (no need to add one)
- TooltipContent renders in a portal
- Use `asChild` on TooltipTrigger to attach to your own element

### Popover

```
Import: import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from '@guidewheel/ui/popover'
```

Required structure:
```tsx
<Popover>
  <PopoverTrigger asChild>
    <DisclosureTrigger>Open menu</DisclosureTrigger>
  </PopoverTrigger>
  <PopoverContent>
    {/* any content */}
  </PopoverContent>
</Popover>
```

Notes:
- PopoverContent renders in a portal with border, shadow, and animation
- Default width is `w-72` — override with className
- Use PopoverAnchor to position relative to a different element than the trigger

### Toaster

```
Import: import { Toaster, toastFor } from '@guidewheel/ui/toaster'
```

Setup:
```tsx
// 1. Place Toaster once per page/feature, with a unique ID
const TOASTER_ID = 'my-page-toaster';

function MyPage() {
  return (
    <div>
      <Toaster id={TOASTER_ID} />
      <MyContent />
    </div>
  );
}

// 2. Show toasts from anywhere
function MyContent() {
  return (
    <Button onClick={() => toastFor(TOASTER_ID).success('Saved!')}>
      Save
    </Button>
  );
}
```

API:
- `toastFor(id).success(message)` — green success toast
- `toastFor(id).error(message)` — red error toast

### Field (Form Fields)

```
Import: import { Field, FieldLabel, FieldDescription, FieldError, FieldSet, FieldGroup, FieldLegend, FieldSeparator, FieldContent, FieldTitle } from '@guidewheel/ui/field'
```

Basic field:
```tsx
<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" />
  <FieldDescription>We'll never share your email.</FieldDescription>
</Field>
```

Field with error:
```tsx
<Field>
  <FieldLabel htmlFor="name">Name</FieldLabel>
  <Input id="name" aria-invalid />
  <FieldError>Name is required</FieldError>
</Field>
```

Field with errors array (from react-hook-form):
```tsx
<FieldError errors={[{ message: 'Required' }, { message: 'Too short' }]} />
```

Horizontal field (e.g. checkbox with label):
```tsx
<Field orientation="horizontal">
  <Checkbox id="agree" />
  <FieldLabel htmlFor="agree">I agree to the terms</FieldLabel>
</Field>
```

Fieldset with legend:
```tsx
<FieldSet>
  <FieldLegend>Contact Info</FieldLegend>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="phone">Phone</FieldLabel>
      <Input id="phone" type="tel" />
    </Field>
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" />
    </Field>
  </FieldGroup>
</FieldSet>
```

### Breadcrumb

```
Import: import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from '@guidewheel/ui/breadcrumb'
```

Required structure:
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Profile</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

Notes:
- Use BreadcrumbPage for the current (non-clickable) page
- Use BreadcrumbLink with `asChild` for router links
- BreadcrumbSeparator defaults to `/` — pass children to customize
- BreadcrumbEllipsis renders a `...` icon for collapsed items

### Tile

```
Import: import { Tile, TileIcon, TileLabel } from '@guidewheel/ui/tile'
```

```tsx
<Tile>
  <TileIcon><FactoryIcon /></TileIcon>
  <TileLabel>Plant A</TileLabel>
</Tile>
```

---

## Composite Components

Higher-level components that compose primitives for common patterns.

### SearchInput

```
Import: import { SearchInput } from '@guidewheel/ui/search-input'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | — | Controlled input value |
| onChange | `(e: ChangeEvent) => void` | — | Standard input change handler |
| onClear | `() => void` | — | Callback when clear button is clicked |
| placeholder | `string` | — | Placeholder text |

A text input with a leading search icon and an optional trailing clear button. The clear button appears only when `value` is non-empty and `onClear` is provided.

```tsx
const [query, setQuery] = useState('');

<SearchInput
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
  placeholder="Search machines..."
/>
```

### DatePicker

```
Import: import { DatePicker } from '@guidewheel/ui/date-picker'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| selected | `Date \| undefined` | — | Currently selected date |
| onSelect | `(date: Date \| undefined) => void` | — | Selection handler |
| placeholder | `string` | `'Pick a date'` | Trigger button text when no date selected |
| disabled | `boolean` | `false` | Disables the trigger |

Composes Popover, Button, and react-day-picker v9. Requires `react-day-picker` as a peer dependency.

```tsx
const [date, setDate] = useState<Date>();

<DatePicker selected={date} onSelect={setDate} placeholder="Select date" />
```

Notes:
- Auto-closes the popover on date selection
- Trigger shows CalendarIcon and formatted date
- Calendar uses Guidewheel token-based styling

### DateRangePicker

```
Import: import { DateRangePicker } from '@guidewheel/ui/date-range-picker'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| range | `{ from?: Date; to?: Date }` | — | Currently selected range |
| onRangeChange | `(range: DateRange \| undefined) => void` | — | Range change handler |
| placeholder | `string` | `'Pick a date range'` | Trigger text when no range selected |
| disabled | `boolean` | `false` | Disables the trigger |

Dual-calendar date range picker. Requires `react-day-picker` as a peer dependency.

```tsx
const [range, setRange] = useState<DateRange>();

<DateRangePicker range={range} onRangeChange={setRange} />
```

Notes:
- Shows two side-by-side month calendars
- Range start/end are visually highlighted with rounded corners removed
- Range middle days use `bg-primary/20` highlight
- Trigger displays formatted range or placeholder

### StatusIndicator

```
Import: import { StatusIndicator } from '@guidewheel/ui/status-indicator'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'dot' \| 'bar'` | `'dot'` | Shape: circle dot or horizontal bar |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Dot: 8/12/16px. Bar: 4/8/12px height, full width |
| state | `'runtime' \| 'idle' \| 'offline' \| 'planned' \| 'nodata'` | `'nodata'` | Load state controlling color |

A pure CSS colored dot or bar showing device load state.

```tsx
<StatusIndicator state="runtime" variant="dot" size="md" />
<StatusIndicator state="offline" variant="bar" size="sm" />
```

Notes:
- Uses `bg-load-state-*` design tokens for colors
- `dot` variant: rounded circle, sized by width/height
- `bar` variant: full-width bar (place in a constrained parent), sized by height

### MetricTile

```
Import: import { MetricTile } from '@guidewheel/ui/metric-tile'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `number \| string` | — | Metric value. Shows placeholder when undefined |
| unit | `string` | `'%'` | Unit of measurement displayed next to value |
| placeholder | `string` | `'N/A'` | Text shown when value is undefined |
| variant | `'primary' \| 'regular'` | `'regular'` | `'primary'` for larger OEE tile, `'regular'` for A/P/Q |
| status | `'on-target' \| 'off-target' \| 'at-risk' \| 'none'` | `'none'` | Target status — `'on-target'` uses green text in primary variant |
| disabled | `boolean` | `false` | Greys out the display |
| label | `string` | — | Label shown above the value |

```tsx
<MetricTile label="OEE" value={85} unit="%" variant="primary" status="on-target" />
<MetricTile label="Availability" value={92} variant="regular" />
<MetricTile label="Quality" placeholder="--" />
```

Notes:
- Value sizing adapts to character count (>4 chars = text-xl, otherwise text-2xl/text-3xl)
- Unit is displayed next to value (not below)
- Accepts children for additional content below the metric display

### MetricCard

```
Import: import { MetricCard } from '@guidewheel/ui/metric-card'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | — | Card title (required) |
| subtitle | `string` | — | Optional subtitle below title |
| state | `'runtime' \| 'idle' \| 'offline' \| 'planned' \| 'nodata'` | `'nodata'` | Load state for left border color and status dot |
| metrics | `Array<{ label: string; value?: string \| number; unit?: string }>` | — | Array of metrics displayed in a grid |
| onClick | `() => void` | — | Click handler. When provided, adds hover effects and keyboard support |

Composes Card, MetricTile, and StatusIndicator. Displays a device card with colored left border, status dot, title, and metric grid.

```tsx
<MetricCard
  title="CNC Mill #1"
  subtitle="Plant Alpha"
  state="runtime"
  metrics={[
    { label: 'OEE', value: 85, unit: '%' },
    { label: 'Availability', value: 92, unit: '%' },
    { label: 'Performance', value: 88, unit: '%' },
  ]}
  onClick={() => navigateToDevice('cnc-1')}
/>
```

Notes:
- Left border colored by load state via `border-l-4`
- When `onClick` is provided: adds `cursor-pointer`, `role="button"`, `tabIndex={0}`, and Enter/Space key handling
- Metrics grid: 2 columns for 1-2 metrics, 3 columns for 3+ metrics
- Accepts `children` for additional content below the metrics

### DataTable

```
Import: import { DataTable } from '@guidewheel/ui/data-table'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | `Column<T>[]` | — | Column definitions (required) |
| data | `T[]` | — | Row data array (required) |
| sortBy | `string` | — | Currently sorted column ID |
| sortDirection | `'asc' \| 'desc'` | — | Sort direction |
| onSort | `(columnId: string) => void` | — | Sort handler |
| isLoading | `boolean` | `false` | Shows skeleton rows |
| loadingRows | `number` | `5` | Number of skeleton rows to show |
| emptyMessage | `string` | `'No data available'` | Empty state title |
| emptyDescription | `string` | — | Empty state description |

Column type:
```ts
type Column<T> = {
  id: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
};
```

```tsx
const columns: Column<Machine>[] = [
  { id: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },
  { id: 'status', header: 'Status', accessor: (row) => <Badge>{row.status}</Badge> },
  { id: 'oee', header: 'OEE', accessor: (row) => `${row.oee}%`, align: 'right' },
];

<DataTable
  columns={columns}
  data={machines}
  sortBy={sortBy}
  sortDirection={sortDir}
  onSort={handleSort}
  isLoading={isLoading}
  emptyMessage="No machines found"
/>
```

Notes:
- Composes Table, Skeleton, and EmptyState internally
- Sortable columns render a text Button with sort direction icon
- Loading state shows Skeleton bars in each cell
- Empty state uses EmptyState component below the table

### CardList

```
Import: import { CardList } from '@guidewheel/ui/card-list'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | `1 \| 2 \| 3 \| 4` | `3` | Responsive grid columns |
| isLoading | `boolean` | `false` | Show skeleton placeholders |
| loadingCount | `number` | `6` | Number of skeleton cards when loading |
| isEmpty | `boolean` | `false` | Show empty state instead of children |
| emptyMessage | `string` | `'No items found'` | Empty state title |
| emptyDescription | `string` | — | Empty state description |

A responsive grid layout for cards with built-in loading and empty states.

```tsx
<CardList columns={3} isLoading={isLoading} isEmpty={data.length === 0}>
  {data.map((item) => (
    <MetricCard key={item.id} title={item.name} state={item.state} />
  ))}
</CardList>
```

Notes:
- Grid is responsive: e.g. `columns={3}` maps to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Loading state shows rounded skeleton cards (`h-36`)
- Empty state renders EmptyState component
- Wrap MetricCard, Card, or any card-like children

### TimeSegment

```
Import: import { TimeSegment } from '@guidewheel/ui/time-segment'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| state | `'runtime' \| 'idle' \| 'offline' \| 'planned' \| 'nodata'` | — | Load state controlling color (required) |
| widthPercent | `number` | — | Width as percentage of parent (0-100, required) |
| label | `string` | — | Tooltip text (rendered as `title` attribute) |

A colored bar segment for building CSS-based timeline/Gantt bars. Place multiple inside a flex container.

```tsx
<div className="flex h-6 w-full overflow-hidden rounded">
  <TimeSegment state="runtime" widthPercent={60} label="Running 60%" />
  <TimeSegment state="idle" widthPercent={25} label="Idle 25%" />
  <TimeSegment state="offline" widthPercent={15} label="Offline 15%" />
</div>
```

Notes:
- Uses `bg-load-state-*` tokens for colors
- Minimum width is 1px even for very small percentages
- Container must have a fixed height (e.g. `h-6` for Gantt rows)

### NavigationSidebar

```
Import: import { NavigationSidebar } from '@guidewheel/ui/navigation-sidebar'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `NavItem[]` | — | Navigation items (required) |
| collapsed | `boolean` | `false` | Whether sidebar is in collapsed (w-16) mode |
| onToggleCollapse | `() => void` | — | Collapse toggle handler |
| onItemClick | `(item: NavItem) => void` | — | Item click handler |
| logo | `React.ReactNode` | — | Custom logo. Defaults to GuidewheelLogo/GuidewheelCircle |
| footer | `React.ReactNode` | — | Footer content above the collapse button |

NavItem type:
```ts
type NavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  active?: boolean;
};
```

```tsx
const [collapsed, setCollapsed] = useState(false);

<NavigationSidebar
  items={[
    { id: 'dashboard', label: 'Dashboard', icon: <FactoryIcon />, active: true },
    { id: 'machines', label: 'Machines', icon: <DeviceIcon /> },
    { id: 'team', label: 'Team', icon: <TeamIcon /> },
  ]}
  collapsed={collapsed}
  onToggleCollapse={() => setCollapsed(!collapsed)}
  onItemClick={(item) => navigate(item.id)}
/>
```

Notes:
- Expanded width: `w-60`, collapsed: `w-16`
- Collapsed mode shows icon-only items with Tooltip on hover
- Includes built-in collapse toggle button at the bottom
- Active item highlighted with `bg-surface text-primary`
- Logo auto-switches between GuidewheelLogo (expanded) and GuidewheelCircle (collapsed)

### AppBar

```
Import: import { AppBar } from '@guidewheel/ui/app-bar'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | — | Page title (required) |
| subtitle | `string` | — | Optional subtitle below title |
| breadcrumbs | `React.ReactNode` | — | Breadcrumb component rendered above title |
| actions | `React.ReactNode` | — | Right-aligned action buttons |

A top bar for page headers with title, breadcrumbs, and actions.

```tsx
<AppBar
  title="Machine Details"
  subtitle="CNC Mill #1"
  breadcrumbs={
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Details</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  }
  actions={<Button color="primary">Edit</Button>}
/>
```

### CommentThread

```
Import: import { CommentThread } from '@guidewheel/ui/comment-thread'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| comments | `Comment[]` | — | Array of comments (required) |
| onAddComment | `(content: string) => void` | — | Submit handler. When provided, shows the comment form |
| placeholder | `string` | `'Write a comment...'` | Textarea placeholder |

Comment type:
```ts
type Comment = {
  id: string;
  author: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
};
```

Composes Avatar, Textarea, and Button. Shows a list of comments with avatars and an optional input form.

```tsx
<CommentThread
  comments={[
    { id: '1', author: 'Jane Doe', content: 'Looks good!', timestamp: '2 hours ago' },
    { id: '2', author: 'John Smith', avatarUrl: '/john.jpg', content: 'Agreed.', timestamp: '1 hour ago' },
  ]}
  onAddComment={(content) => addComment(content)}
/>
```

Notes:
- Avatar fallback shows author initials (first letter of each word, max 2)
- Comment form auto-clears on successful submit
- Submit button is disabled when textarea is empty

### FilterBar

```
Import: import { FilterBar, FilterBarSection, FilterBarActions } from '@guidewheel/ui/filter-bar'
```

| Prop (FilterBar) | Type | Default | Description |
|------------------|------|---------|-------------|
| onClearAll | `() => void` | — | Clear all filters handler |
| activeFilterCount | `number` | `0` | Number of active filters (shows badge + clear button) |

Sub-components:
- **FilterBar** — Horizontal bar container with border-bottom and wrapping.
- **FilterBarSection** — Groups filter controls with gap-2.
- **FilterBarActions** — Right-aligned actions (`ml-auto`).

```tsx
<FilterBar activeFilterCount={2} onClearAll={() => clearFilters()}>
  <FilterBarSection>
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="running">Running</SelectItem>
        <SelectItem value="idle">Idle</SelectItem>
      </SelectContent>
    </Select>
    <SearchInput value={query} onChange={handleSearch} onClear={() => setQuery('')} />
  </FilterBarSection>
  <FilterBarActions>
    <Button variant="text">Export</Button>
  </FilterBarActions>
</FilterBar>
```

Notes:
- Active filter count > 0 shows a Badge and "Clear all" text button
- Wraps at narrow widths (`flex-wrap`)

### Menu

```
Import: import { Menu } from '@guidewheel/ui/menu'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | `React.ReactNode` | — | Trigger element (required, rendered with `asChild` on PopoverTrigger) |
| groups | `MenuGroup[]` | — | Grouped menu items (required) |
| selected | `string \| string[]` | — | Currently selected item ID(s) |
| onSelect | `(id: string) => void` | — | Selection handler |
| multiple | `boolean` | `false` | Multi-select mode (shows checkboxes) |
| searchable | `boolean` | `false` | Show search input at top |
| searchPlaceholder | `string` | `'Search...'` | Search input placeholder |

Types:
```ts
type MenuItem = { id: string; label: string; icon?: React.ReactNode; disabled?: boolean };
type MenuGroup = { label?: string; items: MenuItem[] };
```

Enhanced popover-based dropdown with search, single/multi select, and grouped items.

```tsx
<Menu
  trigger={<DisclosureTrigger>Select Plant</DisclosureTrigger>}
  groups={[
    {
      label: 'Plants',
      items: [
        { id: 'alpha', label: 'Plant Alpha' },
        { id: 'beta', label: 'Plant Beta' },
      ],
    },
  ]}
  selected={selectedPlant}
  onSelect={setSelectedPlant}
  searchable
/>
```

Notes:
- Single select mode: closes on selection, shows check icon for selected item
- Multi select mode: stays open, shows checkboxes
- Search filters items by label (case-insensitive)
- Empty search shows "No results found"
- Built on Popover (not DropdownMenu), so it supports rich content

---

## Layout Components

### MainContent

```
Import: import { MainContent } from '@guidewheel/ui/layout'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'page' \| 'panel'` | `'page'` | Container style |

One per page. Provides card background, padding, border.

```tsx
<MainContent variant="page">
  <h1>Dashboard</h1>
</MainContent>
```

### PageSection

```
Import: import { PageSection } from '@guidewheel/ui/layout'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'md' \| 'lg' \| 'xl'` | `'md'` | Padding and gap |
| color | `'default' \| 'danger'` | `'default'` | Background color |

```tsx
<PageSection size="lg">
  <h2>Section Title</h2>
  <p>Section content</p>
</PageSection>
```

### Frame

```
Import: import { Frame } from '@guidewheel/ui/layout'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | `'default' \| 'muted' \| 'danger'` | `'default'` | Border and background |

```tsx
<Frame color="danger">
  <p>Warning: machine offline</p>
</Frame>
```

### Box

```
Import: import { Box } from '@guidewheel/ui/layout'
```

Thin div abstraction. Accepts `asChild` to merge onto child element.

### Flex / FlexRow / FlexColumn

```
Import: import { Flex, FlexRow, FlexColumn } from '@guidewheel/ui/layout'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| direction | `'row' \| 'col'` | `'row'` | Flex direction (Flex only) |
| spacing | `number` | `0` | Gap in spacing units |
| asChild | `boolean` | `false` | Merge onto child (Flex only) |

```tsx
<FlexColumn spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</FlexColumn>

<FlexRow spacing={2}>
  <Button>Cancel</Button>
  <Button color="primary">Save</Button>
</FlexRow>
```

---

## Chart Components

Chart components use a **separate entry point**: `@guidewheel/ui/chart`. They require `echarts` and `echarts-for-react` as peer dependencies.

### HChart

```
Import: import { HChart } from '@guidewheel/ui/chart'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| option | `EChartsOption` | — | Full ECharts option object (required) |
| height | `number \| string` | `300` | Chart height (px or CSS string) |
| isLoading | `boolean` | `false` | Shows Skeleton overlay while loading |
| onEvents | `Record<string, (params: any) => void>` | — | ECharts event handlers |

Generic ECharts wrapper for line, area, column, bar, and pie charts. Automatically registers the Guidewheel theme on first render.

```tsx
import { HChart } from '@guidewheel/ui/chart';

<HChart
  option={{
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150], type: 'line' }],
  }}
  height={400}
  isLoading={isLoading}
/>
```

Notes:
- Theme is registered once globally as `'guidewheel'` — no manual theme setup needed
- Loading state overlays a Skeleton on top of the chart area
- Uses `notMerge` mode — provide the complete option object each render
- Chart palette: `['#1086f5', '#5c34cb', '#0dc39f', '#f1c232', '#fe6847', '#704dd1', '#ff6b6b', '#4ecdc4']`

### GanttChart

```
Import: import { GanttChart } from '@guidewheel/ui/chart'
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | `GanttSegment[]` | — | Array of time segments (required) |
| height | `number` | `24` | Chart height in px |
| showTooltip | `boolean` | `false` | Show tooltip on hover |
| showXAxis | `boolean` | `false` | Show time axis labels |

GanttSegment type:
```ts
type GanttSegment = {
  start: number;   // Unix timestamp (ms)
  end: number;     // Unix timestamp (ms)
  state: 'runtime' | 'idle' | 'offline' | 'planned' | 'nodata';
  label?: string;  // Tooltip label
};
```

Specialized ECharts wrapper for timeline/Gantt bars showing device load states.

```tsx
import { GanttChart } from '@guidewheel/ui/chart';

<GanttChart
  data={[
    { start: 1710900000000, end: 1710921600000, state: 'runtime', label: 'Running' },
    { start: 1710921600000, end: 1710928800000, state: 'idle', label: 'Idle' },
    { start: 1710928800000, end: 1710936000000, state: 'offline', label: 'Offline' },
  ]}
  height={24}
/>
```

Notes:
- Default height is 24px for compact Gantt bars (max `h-6` per design rules)
- Colors use `LOAD_STATE_COLORS`: runtime=#0dc39f, idle=#f1c232, offline=#fe6847, planned=#704dd1, nodata=#8e8c8c
- No axes by default — set `showXAxis` for time labels
- Animation is disabled for performance with many segments
- Wraps HChart internally

### Chart Theme & Colors

The Guidewheel chart theme is auto-registered by HChart. Key values:

**Chart Palette** (series colors in order):
| Index | Color | Hex |
|-------|-------|-----|
| 0 | Brand Primary | `#1086f5` |
| 1 | Purple | `#5c34cb` |
| 2 | Teal/Success | `#0dc39f` |
| 3 | Yellow/Warning | `#f1c232` |
| 4 | Orange/Danger | `#fe6847` |
| 5 | Violet | `#704dd1` |
| 6 | Red | `#ff6b6b` |
| 7 | Cyan | `#4ecdc4` |

**Load State Colors** (used by GanttChart and StatusIndicator):
| State | Color | Hex |
|-------|-------|-----|
| runtime | Green | `#0dc39f` |
| idle | Yellow | `#f1c232` |
| offline | Orange-red | `#fe6847` |
| planned | Purple | `#704dd1` |
| nodata | Grey | `#8e8c8c` |

**OEE Colors** (for OEE metric charts):
| Metric | Color | Hex |
|--------|-------|-----|
| availability | Green | `#0dc39f` |
| performance | Blue | `#1086f5` |
| quality | Purple | `#5c34cb` |
| overall | Yellow | `#f1c232` |

---

## Icons

```
Import: import { IconName } from '@guidewheel/ui/icons'
```

All icons accept:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'none'` | `'md'` | Icon size |

Size map: xs=12px, sm=16px, md=20px, lg=24px, xl=32px, 2xl=48px

Available icons:
- `AlertTriangleIcon` — Warning/alert indicator
- `ArrowLeftIcon` — Back navigation
- `ArrowRightIcon` — Forward navigation
- `CalendarIcon` — Date/calendar
- `CancelIcon` — Error/cancel (filled circle with X)
- `CheckIcon` — Checkmark/success
- `ChevronDownIcon` — Dropdown indicator
- `ChevronLeftIcon` — Left navigation / collapse
- `ChevronRightIcon` — Right navigation / expand / sub-menu
- `ChevronUpIcon` — Collapse indicator
- `ClockIcon` — Time/schedule
- `CloseIcon` — Close/dismiss (X)
- `DeviceIcon` — Machine/device
- `EditIcon` — Edit/pencil
- `FactoryIcon` — Factory/plant
- `IndeterminateCheckIcon` — Partial selection (minus in box)
- `InfoIcon` — Information
- `LoadingIcon` — Spinner (use with `className="animate-spin"`)
- `MoreHorizontalIcon` — Overflow menu (three dots)
- `ProductionIcon` — Production/manufacturing
- `SearchIcon` — Search magnifying glass
- `TeamIcon` — Team/group
- `TrashIcon` — Delete
- `UserIcon` — Single user/profile

```tsx
import { FactoryIcon, CloseIcon } from '@guidewheel/ui/icons';

<FactoryIcon size="lg" />
<CloseIcon size="sm" className="text-muted-foreground" />
```

### IconProvider

```
Import: import { IconProvider } from '@guidewheel/ui/icons'
```

Sets icon size context for all icons within. Button does this automatically.

```tsx
<IconProvider value={{ size: 'sm' }}>
  <FactoryIcon /> {/* renders at 16px */}
  <UserIcon />    {/* renders at 16px */}
</IconProvider>
```

---

## Brand Assets

```
Import: import { GuidewheelLogo, GuidewheelCircle, HappyGuidewheelCircles } from '@guidewheel/ui/assets'
```

- `GuidewheelLogo` — Full wordmark logo
- `GuidewheelCircle` — Circle icon only
- `HappyGuidewheelCircles` — Decorative illustration

---

## Design Tokens

### Semantic Colors (use these in Tailwind classes)

**Text colors:**
- `text-foreground` — Primary text (dark grey)
- `text-muted-foreground` — Secondary text
- `text-subtle-foreground` — Tertiary text
- `text-pale-foreground` — Disabled/hint text

**Backgrounds:**
- `bg-background` — Page background (white)
- `bg-background-accent` — Slight grey accent
- `bg-surface` — Interactive surface background
- `bg-surface-accent` — Hovered surface
- `bg-card` — Card/section background

**Primary (brand blue):**
- `bg-primary` / `text-primary` — Brand primary (#1086F5)
- `text-primary-foreground` — Text on primary background

**Danger (red):**
- `bg-danger` / `text-danger` — Error/destructive
- `text-danger-foreground` — Text on danger background

**Success (green):**
- `bg-success` / `text-success` — Success states
- `text-success-foreground` — Text on success background

**Warning (yellow):**
- `bg-warning` / `text-warning` — Warning states
- `text-warning-foreground` — Text on warning background

**Borders:**
- `border` (default) — Standard border
- `border-muted` — Subtle border
- `border-accent` — Emphasized border
- `border-input` — Form input border

**Links:**
- `text-link` — Link color
- `text-link-hover` — Link hover

### Brand Color Scales (available as Tailwind classes)

**brand-primary:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100
- Example: `bg-brand-primary-600` (main blue), `text-brand-primary-800`

**brand-grey:** 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
- Example: `bg-brand-grey-200` (light grey), `text-brand-grey-900`

**brand-secondary (purple):** 100-1100
- Example: `bg-brand-secondary-600`

**danger:** 100-1000 + DEFAULT + foreground
- Example: `bg-danger-100` (light red bg), `text-danger-600`

**success:** 100-1000 + DEFAULT + foreground
- Example: `bg-success-100`, `text-success-700`

**warning:** 100-1000 + DEFAULT + foreground
- Example: `bg-warning-100`, `text-warning-700`

**grey:** 100-1200
- Example: `bg-grey-200`, `text-grey-800`

### Load State Colors (domain-specific)

- `bg-load-state-runtime` — Machine running (#0dc39f)
- `bg-load-state-idle` — Machine idle (#f1c232)
- `bg-load-state-offline` — Machine offline (#fe6847)
- `bg-load-state-planned` — Planned downtime (#704dd1)
- `bg-load-state-nodata` — No data available (#8e8c8c)

Also available as border colors: `border-l-load-state-runtime`, etc.

### Chart Colors (hardcoded hex — ECharts cannot read CSS vars)

- Chart palette: `#1086f5`, `#5c34cb`, `#0dc39f`, `#f1c232`, `#fe6847`, `#704dd1`, `#ff6b6b`, `#4ecdc4`
- OEE: availability=`#0dc39f`, performance=`#1086f5`, quality=`#5c34cb`, overall=`#f1c232`

### Breakpoints

| Name | Width |
|------|-------|
| xs | 640px |
| sm | 744px |
| md | 960px |
| lg | 1340px |
| xl | 1780px |

### Font Sizes

| Class | Size / Line-height |
|-------|-------------------|
| text-xs | 11px / 13px |
| text-sm | 14px / 16px |
| text-2xl | 24px / 28px |
| text-3xl | 32px |

### Shadows

- `shadow-card-hover` — Hover effect for cards
- `shadow-2xl` — Large elevation shadow

---

## Common Recipes

### Login Form

```tsx
import { Button } from '@guidewheel/ui/button';
import { Input } from '@guidewheel/ui/input';
import { Field, FieldLabel, FieldSet, FieldDescription } from '@guidewheel/ui/field';
import { GuidewheelLogo } from '@guidewheel/ui/assets';

function LoginForm() {
  return (
    <div className="mx-auto max-w-sm space-y-6 p-6">
      <GuidewheelLogo />
      <FieldSet>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="you@company.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" />
          <FieldDescription>Must be at least 8 characters</FieldDescription>
        </Field>
        <Button color="primary" type="submit" className="w-full">Sign In</Button>
      </FieldSet>
    </div>
  );
}
```

### Dashboard Card

```tsx
import { MainContent } from '@guidewheel/ui/layout';
import { PageSection } from '@guidewheel/ui/layout';
import { FlexRow, FlexColumn } from '@guidewheel/ui/layout';
import { Tile, TileIcon, TileLabel } from '@guidewheel/ui/tile';
import { FactoryIcon } from '@guidewheel/ui/icons';

function Dashboard() {
  return (
    <MainContent variant="page">
      <FlexColumn spacing={4}>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          <Tile>
            <TileIcon><FactoryIcon size="xl" /></TileIcon>
            <TileLabel>Plant Alpha</TileLabel>
          </Tile>
          <Tile>
            <TileIcon><FactoryIcon size="xl" /></TileIcon>
            <TileLabel>Plant Beta</TileLabel>
          </Tile>
        </div>
        <PageSection size="lg">
          <h2 className="text-lg font-medium">Recent Activity</h2>
          <p className="text-muted-foreground">No recent activity.</p>
        </PageSection>
      </FlexColumn>
    </MainContent>
  );
}
```

### Settings Page with Toggle

```tsx
import { MainContent } from '@guidewheel/ui/layout';
import { FlexColumn } from '@guidewheel/ui/layout';
import { Field, FieldLabel, FieldDescription, FieldSet, FieldGroup } from '@guidewheel/ui/field';
import { Switch } from '@guidewheel/ui/switch';
import { Separator } from '@guidewheel/ui/separator';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@guidewheel/ui/breadcrumb';

function SettingsPage() {
  return (
    <MainContent variant="page">
      <FlexColumn spacing={4}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-semibold">Settings</h1>

        <FieldSet>
          <FieldGroup>
            <Field orientation="horizontal">
              <Switch />
              <FieldLabel>Email notifications</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Switch />
              <FieldLabel>SMS alerts</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </FlexColumn>
    </MainContent>
  );
}
```

### Confirm Dialog with Toast

```tsx
import { Button } from '@guidewheel/ui/button';
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from '@guidewheel/ui/alert-dialog';
import { Toaster, toastFor } from '@guidewheel/ui/toaster';

const TOASTER_ID = 'page-toaster';

function DeleteWithConfirmation() {
  const handleDelete = () => {
    // ... perform delete
    toastFor(TOASTER_ID).success('Item deleted successfully');
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button color="danger">Delete Item</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster id={TOASTER_ID} />
    </>
  );
}
```

### Data Table Page

```tsx
import { MainContent } from '@guidewheel/ui/layout';
import { FlexRow, FlexColumn } from '@guidewheel/ui/layout';
import { Button } from '@guidewheel/ui/button';
import { SearchInput } from '@guidewheel/ui/search-input';
import { DataTable, Column } from '@guidewheel/ui/data-table';
import { Badge } from '@guidewheel/ui/badge';
import { StatusIndicator } from '@guidewheel/ui/status-indicator';

type Machine = { name: string; status: string; oee: number };

const columns: Column<Machine>[] = [
  { id: 'name', header: 'Name', accessor: (r) => r.name, sortable: true },
  {
    id: 'status',
    header: 'Status',
    accessor: (r) => <Badge variant="success">{r.status}</Badge>,
  },
  { id: 'oee', header: 'OEE', accessor: (r) => `${r.oee}%`, align: 'right' },
];

function DataTablePage() {
  return (
    <MainContent variant="page">
      <FlexColumn spacing={4}>
        <FlexRow spacing={2} className="items-center justify-between">
          <h1 className="text-2xl font-semibold">Machines</h1>
          <Button color="primary">Add Machine</Button>
        </FlexRow>
        <SearchInput placeholder="Search machines..." value="" onChange={() => {}} />
        <DataTable columns={columns} data={[]} emptyMessage="No machines found" />
      </FlexColumn>
    </MainContent>
  );
}
```

### Machine Dashboard with Cards and Gantt

```tsx
import { CardList } from '@guidewheel/ui/card-list';
import { MetricCard } from '@guidewheel/ui/metric-card';
import { GanttChart } from '@guidewheel/ui/chart';
import { FilterBar, FilterBarSection } from '@guidewheel/ui/filter-bar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@guidewheel/ui/select';

function MachineDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <FilterBar activeFilterCount={1} onClearAll={() => {}}>
        <FilterBarSection>
          <Select defaultValue="all">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plants</SelectItem>
              <SelectItem value="alpha">Plant Alpha</SelectItem>
            </SelectContent>
          </Select>
        </FilterBarSection>
      </FilterBar>

      <CardList columns={3}>
        <MetricCard
          title="CNC Mill #1"
          state="runtime"
          metrics={[{ label: 'OEE', value: 85, unit: '%' }]}
        >
          <GanttChart
            data={[
              { start: 1710900000000, end: 1710936000000, state: 'runtime' },
            ]}
            height={24}
          />
        </MetricCard>
      </CardList>
    </div>
  );
}
```

### Tooltip on Icon Button

```tsx
import { Button } from '@guidewheel/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@guidewheel/ui/tooltip';
import { InfoIcon } from '@guidewheel/ui/icons';

function InfoButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon" variant="text">
          <InfoIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        More information about this feature
      </TooltipContent>
    </Tooltip>
  );
}
```
