import type { WuduScene } from '../../../types/wudu';

// Keep all reviewed learning text here so it can be updated without touching the UI.
export const wuduScenes: WuduScene[] = [
  {
    id: 0,
    key: 'intro',
    title: 'رحلة الوضوء مع عمر ومريم',
    shortTitle: 'البداية',
    kind: 'intro',
    environment: 'garden',
    speaker: 'omar',
    dialogue: 'يبه، نبغى نصلي، وش نسوي أول؟',
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
    dialogue: 'الوضوء طهارة واستعداد للصلاة. ننوي الوضوء في قلوبنا ونبدأ باسم الله.',
    instruction: 'وش نسوي قبل الصلاة؟',
  },
  {
    id: 2,
    key: 'hands',
    title: 'غسل الكفين',
    shortTitle: 'الكفان',
    kind: 'counter',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نغسل كفوفنا زين، ونخلّل بين الأصابع. ثلاث مرات.',
    instruction: 'اضغط على الماء لغسل الكفين',
  },
  {
    id: 3,
    key: 'mouth',
    title: 'المضمضة',
    shortTitle: 'الفم',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نأخذ ماءً قليلًا باليد، ثم نتمضمض ونُخرج الماء.',
    instruction: 'رتّب الحركة: ماء ثم مضمضة',
  },
  {
    id: 4,
    key: 'nose',
    title: 'الاستنشاق والاستنثار',
    shortTitle: 'الأنف',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'ندخل ماءً قليلًا في الأنف برفق، ثم نُخرجه. بدون مبالغة.',
    instruction: 'اختر الحركتين بالترتيب',
  },
  {
    id: 5,
    key: 'face',
    title: 'غسل الوجه',
    shortTitle: 'الوجه',
    kind: 'counter',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نغسل الوجه كله من أعلى الجبهة إلى الذقن، ومن الأذن إلى الأذن. ثلاث مرات.',
    instruction: 'مرّر الماء على الوجه ثلاث مرات',
  },
  {
    id: 6,
    key: 'arms',
    title: 'غسل الذراعين',
    shortTitle: 'الذراعان',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نغسل الذراع اليمنى إلى المِرفق، ثم اليسرى إلى المِرفق.',
    instruction: 'ابدأ باليمين ثم اليسار',
  },
  {
    id: 7,
    key: 'head',
    title: 'مسح الرأس والأذنين',
    shortTitle: 'الرأس',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'بيدين مبللتين نمسح الرأس، ثم نمسح الأذنين.',
    instruction: 'امسح الرأس ثم الأذنين',
  },
  {
    id: 8,
    key: 'feet',
    title: 'غسل القدمين',
    shortTitle: 'القدمان',
    kind: 'sequence',
    environment: 'wudu',
    speaker: 'father',
    dialogue: 'نغسل القدم اليمنى إلى الكعبين، ثم اليسرى، ولا ننسى بين الأصابع.',
    instruction: 'ابدأ بالقدم اليمنى',
  },
  {
    id: 9,
    key: 'challenge',
    title: 'تحدّي بطل الوضوء',
    shortTitle: 'التحدّي',
    kind: 'challenge',
    environment: 'home',
    speaker: 'maryam',
    dialogue: 'يلا نرتّب خطوات الوضوء! اختر كل خطوة بالترتيب الصحيح.',
    instruction: 'رتّب خطوات الوضوء',
  },
  {
    id: 10,
    key: 'complete',
    title: 'أحسنتم يا أبطال!',
    shortTitle: 'النجاح',
    kind: 'complete',
    environment: 'celebration',
    speaker: 'father',
    dialogue: 'ما شاء الله! الحين تعلّمنا الوضوء خطوة بخطوة!',
  },
];

export const quizAnswers = [
  { id: 'wudu', label: 'نتوضأ ونستعد', correct: true, icon: 'water' },
  { id: 'play', label: 'نكمل لعب', correct: false, icon: 'ball' },
  { id: 'sleep', label: 'ننام شوي', correct: false, icon: 'moon' },
];

export const sequenceActivities: Record<string, { id: string; label: string; icon: string }[]> = {
  mouth: [
    { id: 'water', label: 'آخذ ماءً قليلًا', icon: 'hand-water' },
    { id: 'rinse', label: 'أتمضمض برفق', icon: 'mouth' },
  ],
  nose: [
    { id: 'inhale', label: 'أستنشق قليلًا', icon: 'nose-in' },
    { id: 'out', label: 'أُخرج الماء', icon: 'nose-out' },
  ],
  arms: [
    { id: 'right', label: 'الذراع اليمنى', icon: 'arm-right' },
    { id: 'left', label: 'الذراع اليسرى', icon: 'arm-left' },
  ],
  head: [
    { id: 'head', label: 'أمسح الرأس', icon: 'head' },
    { id: 'ears', label: 'أمسح الأذنين', icon: 'ears' },
  ],
  feet: [
    { id: 'right-foot', label: 'القدم اليمنى', icon: 'foot-right' },
    { id: 'left-foot', label: 'القدم اليسرى', icon: 'foot-left' },
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
  focus?: 'right' | 'left' | 'both' | 'water';
};

// Short interactive demonstrations. They can later be paired with recorded audio
// or real reviewed video clips without changing the lesson components.
export const stepDemos: Record<string, DemoStage[]> = {
  hands: [
    { label: 'بلّل الكفين', narration: 'نبدأ بماء قليل ونبلّل الكفين.', icon: 'hand-water', focus: 'water' },
    { label: 'افركهما معًا', narration: 'نفرك الكف اليمين مع الكف الشمال.', icon: 'hands', focus: 'both' },
    { label: 'بين الأصابع', narration: 'ونمرر الماء بين الأصابع جيدًا.', icon: 'hands', focus: 'both' },
  ],
  mouth: [
    { label: 'ماء قليل', narration: 'نأخذ ماءً قليلًا باليد.', icon: 'hand-water', focus: 'water' },
    { label: 'مضمضة برفق', narration: 'نتمضمض بالماء برفق.', icon: 'mouth', focus: 'both' },
    { label: 'إخراج الماء', narration: 'ثم نُخرج الماء.', icon: 'mouth', focus: 'both' },
  ],
  nose: [
    { label: 'ماء قليل', narration: 'نأخذ ماءً قليلًا بدون مبالغة.', icon: 'hand-water', focus: 'water' },
    { label: 'استنشاق برفق', narration: 'ندخل الماء إلى الأنف برفق.', icon: 'nose-in', focus: 'both' },
    { label: 'إخراج الماء', narration: 'ثم نُخرج الماء من الأنف.', icon: 'nose-out', focus: 'both' },
  ],
  face: [
    { label: 'من أعلى الوجه', narration: 'نبدأ من أعلى الجبهة.', icon: 'face', focus: 'water' },
    { label: 'إلى الذقن', narration: 'ننزل بالماء حتى الذقن.', icon: 'face', focus: 'both' },
    { label: 'الوجه كله', narration: 'ونغسل من الأذن إلى الأذن.', icon: 'face', focus: 'both' },
  ],
  arms: [
    { label: 'الذراع اليمنى', narration: 'أولًا نغسل الذراع اليمنى كاملة إلى المِرفق.', icon: 'arm-right', focus: 'right' },
    { label: 'حتى المِرفق', narration: 'نتأكد أن الماء وصل إلى المِرفق.', icon: 'arm-right', focus: 'right' },
    { label: 'الذراع اليسرى', narration: 'ثم نغسل الذراع اليسرى كاملة إلى المِرفق.', icon: 'arm-left', focus: 'left' },
  ],
  head: [
    { label: 'بلّل اليدين', narration: 'نبلّل اليدين بماء قليل.', icon: 'hand-water', focus: 'water' },
    { label: 'امسح الرأس', narration: 'نمسح الرأس باليدين المبللتين.', icon: 'head', focus: 'both' },
    { label: 'ثم الأذنين', narration: 'ثم نمسح الأذنين.', icon: 'ears', focus: 'both' },
  ],
  feet: [
    { label: 'القدم اليمنى', narration: 'أولًا نغسل القدم اليمنى إلى الكعبين.', icon: 'foot-right', focus: 'right' },
    { label: 'بين الأصابع', narration: 'نتأكد من وصول الماء بين الأصابع.', icon: 'feet', focus: 'both' },
    { label: 'القدم اليسرى', narration: 'ثم نغسل القدم اليسرى إلى الكعبين.', icon: 'foot-left', focus: 'left' },
  ],
};
