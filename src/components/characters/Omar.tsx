import type { CharacterMood } from '../../types/wudu';
import { Character } from './Character';

export function Omar({ mood = 'idle', className = '' }: { mood?: CharacterMood; className?: string }) {
  return <Character name="omar" mood={mood} className={className} />;
}

