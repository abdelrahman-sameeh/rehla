import type { WuduScene } from '../../../types/wudu';

// Keep all reviewed learning text here so it can be updated without touching the UI.
export const wuduScenes: WuduScene[] = [
  {
    id: 0,
    key: 'intro',
    title: 'رحلة الوضوء مع عمر وخديجة',
    shortTitle: 'البداية',
    kind: 'intro',
    environment: 'garden',
    speaker: 'omar',
    dialogue: 'يا بابا، إحنا عايزين نصلي، نعمل إيه الأول؟',
    hint: 'قبل الصلاة لازم نتوضأ. يلا نتعلم الوضوء سوا!',
  },
  {
    id: 1,
    key: 'ready',
    title: 'نستعد للوضوء',
    shortTitle: 'الاستعداد',
    kind: 'quiz',
    environment: 'home',
    speaker: 'father',
    dialogue: 'الوضوء طهارة واستعداد للصلاة. بننوي الوضوء في قلبنا ونبدأ باسم الله.',
    instruction: 'نعمل إيه قبل الصلاة؟',
  },
  {
    id: 2,
    key: 'hands',
    title: 'غسل الكفين',
    shortTitle: 'الكفان',
    kind: 'counter',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نغسل كفوفنا كويس، ونوصل المية بين صوابعنا. تلات مرات.',
    instruction: 'دوس على المية عشان تغسل كفوفك',
  },
  {
    id: 3,
    key: 'mouth',
    title: 'المضمضة',
    shortTitle: 'الفم',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'ناخد مية قليلة بإيدنا، وبعدها نتمضمض ونطلّع المية.',
    instruction: 'رتّب الحركة: مية وبعدين مضمضة',
  },
  {
    id: 4,
    key: 'nose',
    title: 'الاستنشاق والاستنثار',
    shortTitle: 'الأنف',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نستنشق مية قليلة بالراحة، وبعدها نستنثرها من غير مبالغة.',
    instruction: 'اختار الحركتين بالترتيب',
  },
  {
    id: 5,
    key: 'face',
    title: 'غسل الوجه',
    shortTitle: 'الوجه',
    kind: 'counter',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نغسل وشنا كله من فوق الجبهة للدقن، ومن الودن للودن. تلات مرات.',
    instruction: 'مرّر المية على وشك تلات مرات',
  },
  {
    id: 6,
    key: 'arms',
    title: 'غسل الذراعين',
    shortTitle: 'الذراعان',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نغسل دراعنا اليمين لحد الكوع، وبعدها الشمال لحد الكوع.',
    instruction: 'ابدأ باليمين وبعدها الشمال',
  },
  {
    id: 7,
    key: 'head',
    title: 'مسح الرأس والأذنين',
    shortTitle: 'الرأس',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نبلّل إيدينا بمية قليلة، ونمسح شعرنا، وبعدها نمسح وداننا.',
    instruction: 'امسح شعرك وبعدها ودانك',
  },
  {
    id: 8,
    key: 'feet',
    title: 'غسل القدمين',
    shortTitle: 'القدمان',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نغسل رجلنا اليمين لحد الكعبين، وبعدها الشمال، ومننساش بين الصوابع.',
    instruction: 'ابدأ برجلك اليمين',
  },
  {
    id: 9,
    key: 'challenge',
    title: 'تحدّي بطل الوضوء',
    shortTitle: 'التحدّي',
    kind: 'challenge',
    environment: 'home',
    speaker: 'maryam',
    dialogue: 'يلا نرتّب خطوات الوضوء! اختار كل خطوة بالترتيب الصح.',
    instruction: 'رتّب خطوات الوضوء',
  },
  {
    id: 10,
    key: 'complete',
    title: 'برافو يا أبطال!',
    shortTitle: 'النجاح',
    kind: 'complete',
    environment: 'celebration',
    speaker: 'father',
    dialogue: 'ما شاء الله! دلوقتي اتعلّمنا الوضوء خطوة بخطوة!',
  },
];

export const quizAnswers = [
  { id: 'wudu', label: 'نتوضّى ونستعد', correct: true, icon: 'water' },
  { id: 'play', label: 'نكمل لعب', correct: false, icon: 'ball' },
  { id: 'sleep', label: 'ننام شوي', correct: false, icon: 'moon' },
];

export const sequenceActivities: Record<string, { id: string; label: string; icon: string; imageKey?: string }[]> = {
  mouth: [
    { id: 'water', label: 'آخد مية قليلة', icon: 'hand-water', imageKey: 'mouth-water' },
    { id: 'rinse', label: 'أتمضمض بالراحة', icon: 'mouth', imageKey: 'mouth-rinse' },
    { id: 'out', label: 'أطلّع المية', icon: 'mouth', imageKey: 'mouth-out' },
  ],
  nose: [
    { id: 'inhale', label: 'أستنشق شوية مية', icon: 'nose-in', imageKey: 'nose-inhale' },
    { id: 'out', label: 'أستنثر المية', icon: 'nose-out', imageKey: 'nose-expel' },
  ],
  arms: [
    { id: 'right', label: 'الدراع اليمين', icon: 'arm-right' },
    { id: 'left', label: 'الدراع الشمال', icon: 'arm-left' },
  ],
  head: [
    { id: 'head', label: 'أمسح شعري', icon: 'head', imageKey: 'head-wipe' },
    { id: 'ears', label: 'أمسح وداني', icon: 'ears', imageKey: 'ears-wipe' },
  ],
  feet: [
    { id: 'right-foot', label: 'الرجل اليمين', icon: 'foot-right' },
    { id: 'left-foot', label: 'الرجل الشمال', icon: 'foot-left' },
  ],
};

export const challengeSteps = [
  { id: 'hands', label: 'غسل الكفين', icon: 'hands' },
  { id: 'mouth-nose', label: 'الفم والأنف', icon: 'mouth' },
  { id: 'face', label: 'غسل الوجه', icon: 'face' },
  { id: 'arms', label: 'غسل الذراعين', icon: 'arms' },
  { id: 'head', label: 'مسح الرأس والأذنين', icon: 'head' },
  { id: 'feet', label: 'غسل القدمين', icon: 'feet' },
];

export type DemoStage = {
  label: string;
  narration: string;
  icon: string;
  imageKey?: string;
  focus?: 'right' | 'left' | 'both' | 'water';
};

// Short interactive demonstrations. They can later be paired with recorded audio
// or real reviewed video clips without changing the lesson components.
export const stepDemos: Record<string, DemoStage[]> = {
  hands: [
    { label: 'بلّل إيديك', narration: 'نبدأ بمية قليلة ونبلّل إيدينا.', icon: 'hand-water', focus: 'water' },
    { label: 'افركهم سوا', narration: 'نفرك كف إيدنا اليمين مع الشمال.', icon: 'hands', focus: 'both' },
    { label: 'بين الصوابع', narration: 'ونوصل المية كويس بين صوابعنا.', icon: 'hands', focus: 'both' },
  ],
  mouth: [
    { label: 'مية قليلة', narration: 'ناخد مية قليلة بإيدنا.', icon: 'hand-water', imageKey: 'mouth-water', focus: 'water' },
    { label: 'مضمضة بالراحة', narration: 'نتمضمض بالمية بالراحة.', icon: 'mouth', imageKey: 'mouth-rinse', focus: 'both' },
    { label: 'طلّع المية', narration: 'وبعدين نطلّع المية في الحوض.', icon: 'mouth', imageKey: 'mouth-out', focus: 'both' },
  ],
  nose: [
    { label: 'مية قليلة', narration: 'ناخد مية قليلة من غير مبالغة.', icon: 'hand-water', imageKey: 'mouth-water', focus: 'water' },
    { label: 'استنشاق بالراحة', narration: 'نستنشق المية بالأنف بالراحة.', icon: 'nose-in', imageKey: 'nose-inhale', focus: 'both' },
    { label: 'الاستنثار', narration: 'وبعدها نستنثر المية من الأنف.', icon: 'nose-out', imageKey: 'nose-expel', focus: 'both' },
  ],
  face: [
    { label: 'من فوق الوش', narration: 'نبدأ من فوق الجبهة.', icon: 'face', imageKey: 'face-wash', focus: 'water' },
    { label: 'لحد الدقن', narration: 'ننزّل المية لحد الدقن.', icon: 'face', imageKey: 'face-wash', focus: 'both' },
    { label: 'الوش كله', narration: 'ونغسل من الودن للودن.', icon: 'face', imageKey: 'face-wash', focus: 'both' },
  ],
  arms: [
    { label: 'الدراع اليمين', narration: 'الأول نغسل دراعنا اليمين كله لحد الكوع.', icon: 'arm-right', focus: 'right' },
    { label: 'لحد الكوع', narration: 'نتأكد إن المية وصلت للكوع.', icon: 'arm-right', focus: 'right' },
    { label: 'الدراع الشمال', narration: 'وبعدين نغسل دراعنا الشمال كله لحد الكوع.', icon: 'arm-left', focus: 'left' },
  ],
  head: [
    { label: 'بلّل إيديك', narration: 'نبلّل إيدينا بمية قليلة.', icon: 'hand-water', imageKey: 'mouth-water', focus: 'water' },
    { label: 'امسح شعرك', narration: 'نمسح شعرنا بإيدينا المبلولة من قدّام لورا.', icon: 'head', imageKey: 'head-wipe', focus: 'both' },
    { label: 'وبعدين الودنين', narration: 'وبعدها نمسح وداننا بالراحة.', icon: 'ears', imageKey: 'ears-wipe', focus: 'both' },
  ],
  feet: [
    { label: 'الرجل اليمين', narration: 'الأول نغسل رجلنا اليمين لحد الكعبين.', icon: 'foot-right', focus: 'right' },
    { label: 'بين الصوابع', narration: 'نتأكد إن المية وصلت بين الصوابع.', icon: 'feet', focus: 'both' },
    { label: 'الرجل الشمال', narration: 'وبعدين نغسل رجلنا الشمال لحد الكعبين.', icon: 'foot-left', focus: 'left' },
  ],
};
