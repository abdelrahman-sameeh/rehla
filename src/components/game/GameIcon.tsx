type Props = { name: string; size?: number; className?: string };

export function GameIcon({ name, size = 64, className = '' }: Props) {
  const isFoot = name.includes('foot') || name === 'feet';
  const isArm = name.includes('arm') || name === 'arms';
  const isHead = name === 'head' || name === 'ears';
  const isMouth = name === 'mouth' || name === 'mouth-nose';
  const isNose = name.includes('nose');
  const isWater = name === 'water' || name === 'hand-water' || name === 'hands';

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="37" fill="#E9F7F3" />
      {isWater && (
        <>
          <path d="M43 12 C43 12 27 31 27 43 C27 53 34 60 43 60 C52 60 59 53 59 43 C59 31 43 12 43 12Z" fill="#52C7D7" />
          <path d="M48 52 Q54 48 53 40" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".7" />
          <path d="M13 57 Q25 47 36 58" fill="none" stroke="#C9825A" strokeWidth="9" strokeLinecap="round" />
        </>
      )}
      {isMouth && (
        <>
          <circle cx="40" cy="36" r="22" fill="#D9956B" />
          <path d="M26 41 Q40 53 55 41 Q40 35 26 41Z" fill="#9D4756" />
          <path d="M31 42 Q40 46 50 42" fill="none" stroke="#fff" strokeWidth="3" />
          <path d="M59 23 Q68 32 60 41" fill="none" stroke="#52C7D7" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {isNose && (
        <>
          <path d="M40 17 Q45 32 48 43 Q49 53 37 54 Q28 53 32 48" fill="#D9956B" stroke="#9A6045" strokeWidth="3" strokeLinecap="round" />
          <path d={name === 'nose-in' ? 'M19 43 Q27 35 35 43' : 'M35 62 Q27 55 20 62'} fill="none" stroke="#52C7D7" strokeWidth="5" strokeLinecap="round" />
          <path d={name === 'nose-in' ? 'M29 36 L36 43 L28 48' : 'M27 55 L20 62 L29 68'} fill="none" stroke="#52C7D7" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {name === 'face' && (
        <>
          <circle cx="40" cy="38" r="23" fill="#D9956B" />
          <circle cx="32" cy="34" r="3" fill="#2D3E42" />
          <circle cx="48" cy="34" r="3" fill="#2D3E42" />
          <path d="M33 47 Q40 53 48 47" fill="none" stroke="#914B4F" strokeWidth="3" strokeLinecap="round" />
          <path d="M18 17 L14 26 M61 14 L65 23 M40 7 L40 17" stroke="#52C7D7" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {isArm && (
        <>
          <path d="M19 51 Q32 48 34 33 L36 17 Q37 10 44 12 Q50 14 48 22 L46 35 Q44 46 56 48 Q63 49 62 57 Q60 65 51 64 Q34 61 19 63Z" fill="#C9825A" />
          <path d="M22 48 Q29 42 35 49" fill="none" stroke="#52C7D7" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {isHead && (
        <>
          <path d="M18 42 Q18 15 40 14 Q64 15 63 42 L57 61 L23 61Z" fill="#D9956B" />
          <path d="M18 40 Q17 15 40 14 Q62 15 63 40 Q54 25 40 25 Q27 26 18 40Z" fill="#332A29" />
          <path d="M18 13 Q40 3 62 13" fill="none" stroke="#52C7D7" strokeWidth="5" strokeLinecap="round" />
          {name === 'ears' && <path d="M14 42 Q8 39 10 49 Q12 57 19 52 M65 42 Q71 39 69 49 Q67 57 61 52" fill="none" stroke="#C9825A" strokeWidth="5" />}
        </>
      )}
      {isFoot && (
        <>
          <path d="M49 12 Q58 14 55 29 L52 43 Q66 46 66 56 Q65 66 52 67 L23 67 Q16 66 16 59 Q17 53 26 51 L36 48 L39 21 Q40 11 49 12Z" fill="#C9825A" />
          <path d="M19 45 Q36 38 54 45" fill="none" stroke="#52C7D7" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {name === 'ball' && <><circle cx="40" cy="41" r="25" fill="#F3A847" /><path d="M40 16 L52 34 L45 57 L24 53 L18 33Z" fill="none" stroke="#fff" strokeWidth="4" /><circle cx="40" cy="40" r="8" fill="#fff" /></>}
      {name === 'moon' && <path d="M52 12 Q30 21 32 43 Q34 61 55 65 Q45 71 33 67 Q14 61 13 41 Q12 20 31 12 Q42 7 52 12Z" fill="#7B66C9" />}
    </svg>
  );
}

