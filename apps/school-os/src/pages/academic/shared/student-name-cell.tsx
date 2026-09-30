import { Avatar } from '@vezham/react-v3'

export const getStudentInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('')

type Classes = {
  studentNameAvatar: string
  studentNameCell: string
  studentNamePrimary: string
  studentNameSecondary: string
  studentNameText: string
}

type Props = {
  avatar?: string
  classes: Classes
  initials: string
  name: string
  secondaryText?: string
}

export const StudentNameCell = ({
  avatar,
  classes,
  initials,
  name,
  secondaryText
}: Props) => (
  <div className={classes.studentNameCell}>
    <Avatar className={classes.studentNameAvatar} size="sm">
      {avatar && <Avatar.Image src={avatar} alt={name} />}
      <Avatar.Fallback>{initials}</Avatar.Fallback>
    </Avatar>
    <div className={classes.studentNameText}>
      <div className={classes.studentNamePrimary}>{name}</div>
      {secondaryText && (
        <div className={classes.studentNameSecondary}>{secondaryText}</div>
      )}
    </div>
  </div>
)
