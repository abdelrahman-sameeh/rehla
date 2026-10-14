export type CharacterMood =
  | 'idle'
  | 'talking'
  | 'happy'
  | 'thinking'
  | 'pointing'
  | 'celebrating';

export type CharacterName = 'omar' | 'maryam' | 'father';

export type SceneKind =
  | 'intro'
  | 'quiz'
  | 'counter'
  | 'sequence'
  | 'challenge'
  | 'complete';

export type WuduScene = {
  id: number;
  key: string;
  title: string;
  shortTitle: string;
  kind: SceneKind;
  environment: 'garden' | 'home' | 'wudu' | 'celebration';
  speaker: CharacterName;
  dialogue: string;
  hint?: string;
  instruction?: string;
};

