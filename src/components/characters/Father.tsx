import type { CharacterMood } from '../../types/wudu';
import { Character } from './Character';

export function Father({ mood = 'idle', className = '' }: { mood?: CharacterMood; className?: string }) {
  return <Character name="father" mood={mood} className={className} />;
}

