import type { CharacterMood } from '../../types/wudu';
import { Character } from './Character';

export function Maryam({ mood = 'idle', className = '' }: { mood?: CharacterMood; className?: string }) {
  return <Character name="maryam" mood={mood} className={className} />;
}

