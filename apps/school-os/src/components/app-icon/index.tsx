import {
  AddFolder as AddFolderIcon,
  Add as AddIcon,
  Airbuds as AirbudsIcon,
  AltArrowDown as AltArrowDownIcon,
  AltArrowLeft as AltArrowLeftIcon,
  AltArrowRight as AltArrowRightIcon,
  AltArrowUp as AltArrowUpIcon,
  Archive as ArchiveIcon,
  ArchiveUp as ArchiveUpIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ArrowRightUp as ArrowRightUpIcon,
  Backpack as BackpackIcon,
  Banknote as BanknoteIcon,
  Bell as BellIcon,
  Bill as BillIcon,
  Bluetooth as BluetoothIcon,
  Book2 as Book2Icon,
  BookBookmark as BookBookmarkIcon,
  Book as BookIcon,
  Bookmark as BookmarkIcon,
  Box as BoxIcon,
  Buildings3 as Buildings3Icon,
  Buildings as BuildingsIcon,
  CalendarDate as CalendarDateIcon,
  Calendar as CalendarIcon,
  CalendarMark as CalendarMarkIcon,
  CallDropped as CallDroppedIcon,
  Card as CardIcon,
  CartLarge as CartLargeIcon,
  Case as CaseIcon,
  Chart as ChartIcon,
  ChartSquare as ChartSquareIcon,
  ChatRoundDots as ChatRoundDotsIcon,
  CheckRead as CheckReadIcon,
  ClipboardList as ClipboardListIcon,
  ClockCircle as ClockCircleIcon,
  Close as CloseIcon,
  Copy as CopyIcon,
  CupStar as CupStarIcon,
  Devices as DevicesIcon,
  DocumentAdd as DocumentAddIcon,
  Document as DocumentIcon,
  DocumentText as DocumentTextIcon,
  Download as DownloadIcon,
  Dumbbell as DumbbellIcon,
  Eye as EyeIcon,
  FileText as FileTextIcon,
  Flag as FlagIcon,
  Folder as FolderIcon,
  FolderWithFiles as FolderWithFilesIcon,
  Gallery as GalleryIcon,
  Gamepad as GamepadIcon,
  Gift as GiftIcon,
  HeadphonesRound as HeadphonesRoundIcon,
  Heart as HeartIcon,
  Home as HomeIcon,
  type IconComponent,
  type IconProps,
  IncomingCall as IncomingCallIcon,
  Key as KeyIcon,
  Leaf as LeafIcon,
  Library as LibraryIcon,
  List as ListIcon,
  Magnifier as MagnifierIcon,
  MenuDots as MenuDotsIcon,
  Moon as MoonIcon,
  NotebookBookmark as NotebookBookmarkIcon,
  OutgoingCall as OutgoingCallIcon,
  Palette as PaletteIcon,
  PaletteRound as PaletteRoundIcon,
  Pen as PenIcon,
  Play as PlayIcon,
  Printer as PrinterIcon,
  QuestionCircle as QuestionCircleIcon,
  RecordCircle as RecordCircleIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
  ShieldCheck as ShieldCheckIcon,
  Sidebar as SidebarIcon,
  SidebarMinimalistic as SidebarMinimalisticIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  SmileCircle as SmileCircleIcon,
  SortFromBottomToTop as SortFromBottomToTopIcon,
  SortFromTopToBottom as SortFromTopToBottomIcon,
  SortVertical as SortVerticalIcon,
  SquareAcademicCap as SquareAcademicCapIcon,
  Star as StarIcon,
  Sun2 as Sun2Icon,
  Sun as SunIcon,
  TrashBinTrash as TrashBinTrashIcon,
  Upload as UploadIcon,
  UserCheck as UserCheckIcon,
  UserCheckRounded as UserCheckRoundedIcon,
  User as UserIcon,
  UsersGroupRounded as UsersGroupRoundedIcon,
  VerifiedCheck as VerifiedCheckIcon,
  Videocamera as VideocameraIcon,
  VolumeLoud as VolumeLoudIcon,
  Wallet as WalletIcon,
  WiFi as WiFiIcon,
  Widget2 as Widget2Icon,
  Widget as WidgetIcon
} from '@vezham/icons-react'

// Keep stored bookmark and menu icon identifiers compatible with existing data.
const icons = {
  'lucide:arrow-down-wide-narrow': {
    component: SortFromTopToBottomIcon,
    weight: 'outline'
  },
  'lucide:arrow-left': { component: ArrowLeftIcon, weight: 'outline' },
  'lucide:arrow-right': { component: ArrowRightIcon, weight: 'outline' },
  'lucide:arrow-up-wide-narrow': {
    component: SortFromBottomToTopIcon,
    weight: 'outline'
  },
  'lucide:badge-check': { component: VerifiedCheckIcon, weight: 'outline' },
  'lucide:bar-chart-2': { component: ChartIcon, weight: 'outline' },
  'lucide:bell': { component: BellIcon, weight: 'outline' },
  'lucide:book': { component: BookIcon, weight: 'outline' },
  'lucide:book-open': { component: Book2Icon, weight: 'outline' },
  'lucide:briefcase-business': { component: CaseIcon, weight: 'outline' },
  'lucide:calendar-check': { component: CalendarMarkIcon, weight: 'outline' },
  'lucide:calendar-clock': { component: CalendarDateIcon, weight: 'outline' },
  'lucide:calendar-days': { component: CalendarDateIcon, weight: 'outline' },
  'lucide:calendar-minus': { component: CalendarIcon, weight: 'outline' },
  'lucide:chart-no-axes-column': { component: ChartIcon, weight: 'outline' },
  'lucide:check': { component: CheckReadIcon, weight: 'outline' },
  'lucide:chevron-down': { component: AltArrowDownIcon, weight: 'outline' },
  'lucide:chevron-left': { component: AltArrowLeftIcon, weight: 'outline' },
  'lucide:chevron-right': { component: AltArrowRightIcon, weight: 'outline' },
  'lucide:chevron-up': { component: AltArrowUpIcon, weight: 'outline' },
  'lucide:chevrons-up-down': { component: SortVerticalIcon, weight: 'outline' },
  'lucide:circle-dot': { component: RecordCircleIcon, weight: 'outline' },
  'lucide:circle-help': { component: QuestionCircleIcon, weight: 'outline' },
  'lucide:clipboard-list': { component: ClipboardListIcon, weight: 'outline' },
  'lucide:clock': { component: ClockCircleIcon, weight: 'outline' },
  'lucide:clock-3': { component: ClockCircleIcon, weight: 'outline' },
  'lucide:download': { component: DownloadIcon, weight: 'outline' },
  'lucide:dumbbell': { component: DumbbellIcon, weight: 'outline' },
  'lucide:eye': { component: EyeIcon, weight: 'outline' },
  'lucide:file-chart-column': { component: ChartSquareIcon, weight: 'outline' },
  'lucide:file-pen': { component: DocumentAddIcon, weight: 'outline' },
  'lucide:file-spreadsheet': { component: DocumentTextIcon, weight: 'outline' },
  'lucide:file-text': { component: FileTextIcon, weight: 'outline' },
  'lucide:graduation-cap': {
    component: SquareAcademicCapIcon,
    weight: 'outline'
  },
  'lucide:home': { component: HomeIcon, weight: 'outline' },
  'lucide:layout-grid': { component: WidgetIcon, weight: 'outline' },
  'lucide:library': { component: LibraryIcon, weight: 'outline' },
  'lucide:list': { component: ListIcon, weight: 'outline' },
  'lucide:more-horizontal': { component: MenuDotsIcon, weight: 'outline' },
  'lucide:more-vertical': {
    component: MenuDotsIcon,
    weight: 'outline',
    rotate: 90
  },
  'lucide:package': { component: BoxIcon, weight: 'outline' },
  'lucide:panel-left-close': {
    component: SidebarMinimalisticIcon,
    weight: 'outline'
  },
  'lucide:panel-left-open': {
    component: SidebarMinimalisticIcon,
    weight: 'outline'
  },
  'lucide:pencil': { component: PenIcon, weight: 'outline' },
  'lucide:phone-incoming': { component: IncomingCallIcon, weight: 'outline' },
  'lucide:phone-missed': { component: CallDroppedIcon, weight: 'outline' },
  'lucide:phone-outgoing': { component: OutgoingCallIcon, weight: 'outline' },
  'lucide:plus': { component: AddIcon, weight: 'outline' },
  'lucide:printer': { component: PrinterIcon, weight: 'outline' },
  'lucide:receipt': { component: BillIcon, weight: 'outline' },
  'lucide:refresh-cw': { component: RefreshIcon, weight: 'outline' },
  'lucide:school': { component: BuildingsIcon, weight: 'outline' },
  'lucide:search': { component: MagnifierIcon, weight: 'outline' },
  'lucide:settings': { component: SettingsIcon, weight: 'outline' },
  'lucide:split-square-horizontal': {
    component: SidebarIcon,
    weight: 'outline'
  },
  'lucide:trash-2': { component: TrashBinTrashIcon, weight: 'outline' },
  'lucide:upload': { component: UploadIcon, weight: 'outline' },
  'lucide:user': { component: UserIcon, weight: 'outline' },
  'lucide:user-check': { component: UserCheckIcon, weight: 'outline' },
  'lucide:user-round-check': {
    component: UserCheckRoundedIcon,
    weight: 'outline'
  },
  'lucide:users': { component: UsersGroupRoundedIcon, weight: 'outline' },
  'lucide:wallet': { component: WalletIcon, weight: 'outline' },
  'lucide:x': { component: CloseIcon, weight: 'outline' },
  'mdi:skip-next': { component: SkipNextIcon, weight: 'filled' },
  'mdi:skip-previous': { component: SkipPreviousIcon, weight: 'filled' },
  'mdi:wifi': { component: WiFiIcon, weight: 'filled' },
  'solar:airbuds-bold': { component: AirbudsIcon, weight: 'filled' },
  'solar:alt-arrow-down-linear': {
    component: AltArrowDownIcon,
    weight: 'outline'
  },
  'solar:alt-arrow-right-linear': {
    component: AltArrowRightIcon,
    weight: 'outline'
  },
  'solar:alt-arrow-up-linear': { component: AltArrowUpIcon, weight: 'outline' },
  'solar:archive-bold': { component: ArchiveIcon, weight: 'filled' },
  'solar:archive-linear': { component: ArchiveIcon, weight: 'outline' },
  'solar:archive-up-linear': { component: ArchiveUpIcon, weight: 'outline' },
  'solar:arrow-right-up-linear': {
    component: ArrowRightUpIcon,
    weight: 'outline'
  },
  'solar:backpack-bold': { component: BackpackIcon, weight: 'filled' },
  'solar:banknote-bold': { component: BanknoteIcon, weight: 'filled' },
  'solar:bell-linear': { component: BellIcon, weight: 'outline' },
  'solar:bluetooth-bold': { component: BluetoothIcon, weight: 'filled' },
  'solar:book-bookmark-bold': { component: BookBookmarkIcon, weight: 'filled' },
  'solar:bookmark-bold': { component: BookmarkIcon, weight: 'filled' },
  'solar:box-bold': { component: BoxIcon, weight: 'filled' },
  'solar:buildings-3-bold': { component: Buildings3Icon, weight: 'filled' },
  'solar:card-bold': { component: CardIcon, weight: 'filled' },
  'solar:card-linear': { component: CardIcon, weight: 'outline' },
  'solar:cart-large-bold': { component: CartLargeIcon, weight: 'filled' },
  'solar:chart-bold': { component: ChartIcon, weight: 'filled' },
  'solar:chat-round-dots-linear': {
    component: ChatRoundDotsIcon,
    weight: 'outline'
  },
  'solar:copy-bold': { component: CopyIcon, weight: 'filled' },
  'solar:cup-star-bold': { component: CupStarIcon, weight: 'filled' },
  'solar:devices-linear': { component: DevicesIcon, weight: 'outline' },
  'solar:document-bold': { component: DocumentIcon, weight: 'filled' },
  'solar:document-linear': { component: DocumentIcon, weight: 'outline' },
  'solar:flag-bold': { component: FlagIcon, weight: 'filled' },
  'solar:folder-bold': { component: FolderIcon, weight: 'filled' },
  'solar:folder-plus-linear': { component: AddFolderIcon, weight: 'outline' },
  'solar:folder-with-files-linear': {
    component: FolderWithFilesIcon,
    weight: 'outline'
  },
  'solar:gallery-linear': { component: GalleryIcon, weight: 'outline' },
  'solar:gamepad-bold': { component: GamepadIcon, weight: 'filled' },
  'solar:gift-bold': { component: GiftIcon, weight: 'filled' },
  'solar:headphones-round-bold': {
    component: HeadphonesRoundIcon,
    weight: 'filled'
  },
  'solar:heart-bold': { component: HeartIcon, weight: 'filled' },
  'solar:home-bold': { component: HomeIcon, weight: 'filled' },
  'solar:key-bold': { component: KeyIcon, weight: 'filled' },
  'solar:leaf-bold': { component: LeafIcon, weight: 'filled' },
  'solar:library-bold': { component: LibraryIcon, weight: 'filled' },
  'solar:list-bold': { component: ListIcon, weight: 'filled' },
  'solar:magnifer-linear': { component: MagnifierIcon, weight: 'outline' },
  'solar:moon-bold': { component: MoonIcon, weight: 'filled' },
  'solar:notebook-bookmark-bold': {
    component: NotebookBookmarkIcon,
    weight: 'filled'
  },
  'solar:palette-linear': { component: PaletteIcon, weight: 'outline' },
  'solar:palette-round-linear': {
    component: PaletteRoundIcon,
    weight: 'outline'
  },
  'solar:pen-linear': { component: PenIcon, weight: 'outline' },
  'solar:play-bold': { component: PlayIcon, weight: 'filled' },
  'solar:settings-bold': { component: SettingsIcon, weight: 'filled' },
  'solar:settings-linear': { component: SettingsIcon, weight: 'outline' },
  'solar:share-linear': { component: ShareIcon, weight: 'outline' },
  'solar:shield-check-linear': {
    component: ShieldCheckIcon,
    weight: 'outline'
  },
  'solar:smile-circle-linear': {
    component: SmileCircleIcon,
    weight: 'outline'
  },
  'solar:square-academic-cap-bold': {
    component: SquareAcademicCapIcon,
    weight: 'filled'
  },
  'solar:star-bold': { component: StarIcon, weight: 'filled' },
  'solar:star-linear': { component: StarIcon, weight: 'outline' },
  'solar:sun-2-bold': { component: Sun2Icon, weight: 'filled' },
  'solar:sun-bold': { component: SunIcon, weight: 'filled' },
  'solar:trash-bin-trash-linear': {
    component: TrashBinTrashIcon,
    weight: 'outline'
  },
  'solar:user-linear': { component: UserIcon, weight: 'outline' },
  'solar:users-group-rounded-bold': {
    component: UsersGroupRoundedIcon,
    weight: 'filled'
  },
  'solar:videocamera-linear': { component: VideocameraIcon, weight: 'outline' },
  'solar:volume-loud-bold': { component: VolumeLoudIcon, weight: 'filled' },
  'solar:wallet-bold': { component: WalletIcon, weight: 'filled' },
  'solar:wallet-linear': { component: WalletIcon, weight: 'outline' },
  'solar:widget-2-bold': { component: Widget2Icon, weight: 'filled' }
} satisfies Record<
  string,
  { component: IconComponent; weight: IconProps['weight']; rotate?: number }
>

type Props = IconProps & { icon?: string }

export const AppIcon = ({
  icon,
  size,
  width,
  height,
  style,
  ...props
}: Props) => {
  if (!icon || !Object.prototype.hasOwnProperty.call(icons, icon)) return null
  const entry = icons[icon as keyof typeof icons]
  const Component = entry.component
  return (
    <Component
      size={width ?? size ?? '1em'}
      height={height ?? width ?? size ?? '1em'}
      weight={entry.weight}
      style={{
        ...('rotate' in entry ? { transform: 'rotate(90deg)' } : {}),
        ...style
      }}
      aria-hidden="true"
      {...props}
    />
  )
}
