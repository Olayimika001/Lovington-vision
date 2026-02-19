import { ref, onMounted } from 'vue'

const WAT_TIMEZONE = 'Africa/Lagos'
const WAT_UTC_OFFSET = 'UTC+1'

const WEEKDAY_YO = {
  0: 'Ọjọ́ Àìkú',
  1: 'Ọjọ́ Ajé',
  2: 'Ọjọ́ Ìsẹ́gun',
  3: 'Ọjọ́rú',
  4: 'Ọjọ́bọ̀',
  5: 'Ọjọ́ Ẹtì',
  6: 'Ọjọ́ Àbámẹ́ta'
}

const DEFAULT_SLOTS = ['09:00', '14:00', '17:00']
const SATURDAY_SLOTS = ['10:00', '12:00']
const SUNDAY_SLOTS = []

function getSlotsForDay(dayOfWeek) {
  if (dayOfWeek === 0) return SUNDAY_SLOTS
  if (dayOfWeek === 6) return SATURDAY_SLOTS
  return DEFAULT_SLOTS
}

function buildNext7Days() {
  const days = []
  const date = new Date()
  const formatterEn = new Intl.DateTimeFormat('en', { weekday: 'long' })
  const formatterDate = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
  const formatterShortDate = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' })

  let i = 0
  while (days.length < 7) {
    const d = new Date(date)
    d.setDate(date.getDate() + i)
    i++
    const dayOfWeek = d.getDay()
    if (dayOfWeek === 0) continue // Skip Sunday – no availability
    const slots = getSlotsForDay(dayOfWeek)
    const dateStr = formatterDate.format(d)
    const dayEn = formatterEn.format(d)
    const dayYo = WEEKDAY_YO[dayOfWeek]
    const dateLabel = formatterShortDate.format(d)
    days.push({ dateStr, day: dayEn, dayYo, dateLabel, dayOfWeek, slots, date: d })
  }
  return days
}

function formatSlotTime(slotHHmm, localeTag = 'en') {
  const [hours, minutes] = slotHHmm.split(':').map(Number)
  const utcHours = hours - 1
  const d = new Date(Date.UTC(2020, 0, 1, utcHours, minutes))
  return new Intl.DateTimeFormat(localeTag, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: WAT_TIMEZONE
  }).format(d)
}

function formatSlotLabel(slotHHmm, localeTag = 'en') {
  const timeStr = formatSlotTime(slotHHmm, localeTag)
  return `${timeStr} WAT (${WAT_UTC_OFFSET})`
}

export function useConsultation() {
  const availability = ref([])

  onMounted(() => {
    availability.value = buildNext7Days()
  })

  return {
    availability,
    formatSlotLabel
  }
}
