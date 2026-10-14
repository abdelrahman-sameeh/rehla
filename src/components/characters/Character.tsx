import { motion } from 'motion/react';
import type { CharacterMood, CharacterName } from '../../types/wudu';

type Props = {
  name: CharacterName;
  mood?: CharacterMood;
  className?: string;
  label?: boolean;
};

const characterConfig = {
  omar: {
    label: 'عمر',
    skin: '#C9825A',
    hair: '#2E2525',
    shirt: '#F59F43',
    shirtDark: '#E27B2C',
    pants: '#315C75',
    hijab: null,
  },
  maryam: {
    label: 'خديجة',
    skin: '#D9956B',
    hair: '#3A2925',
    shirt: '#7B66C9',
    shirtDark: '#5C48A9',
    pants: '#E9B855',
    hijab: '#E35F79',
  },
  father: {
    label: 'بابا',
    skin: '#B9714D',
    hair: '#2A2424',
    shirt: '#36A68F',
    shirtDark: '#197E71',
    pants: '#3C5365',
    hijab: null,
  },
};

export function Character({ name, mood = 'idle', className = '', label = true }: Props) {
  const config = characterConfig[name];
  const isFather = name === 'father';
  const isMaryam = name === 'maryam';
  const armPose = mood === 'pointing' ? -24 : mood === 'celebrating' ? -44 : 10;
  const otherArmPose = mood === 'celebrating' ? 42 : mood === 'thinking' ? -25 : -8;

  return (
    <motion.div
      className={`character character--${name} ${className}`}
      initial={{ y: 22, opacity: 0 }}
      animate={{ y: [0, -4, 0], opacity: 1 }}
      transition={{ y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.4 } }}
      aria-label={`${config.label} - ${mood}`}
      role="img"
    >
      <svg viewBox="0 0 220 340" className="character__svg" aria-hidden="true">
        <defs>
          <linearGradient id={`shirt-${name}`} x1="0" y1="0" x2="0.9" y2="1">
            <stop stopColor={config.shirt} />
            <stop offset="1" stopColor={config.shirtDark} />
          </linearGradient>
          <filter id={`shadow-${name}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#294B55" floodOpacity=".18" />
          </filter>
        </defs>

        <ellipse cx="110" cy="322" rx={isFather ? 65 : 55} ry="11" fill="#214852" opacity=".16" />

        <g filter={`url(#shadow-${name})`}>
          <motion.g
            style={{ transformOrigin: '78px 188px' }}
            animate={{ rotate: otherArmPose }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <rect x="55" y="177" width={isFather ? 25 : 22} height="91" rx="12" fill={`url(#shirt-${name})`} />
            <circle cx="68" cy="269" r={isFather ? 13 : 12} fill={config.skin} />
          </motion.g>
          <motion.g
            style={{ transformOrigin: '142px 188px' }}
            animate={{ rotate: armPose }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <rect x="140" y="177" width={isFather ? 25 : 22} height="91" rx="12" fill={`url(#shirt-${name})`} />
            <circle cx="153" cy="269" r={isFather ? 13 : 12} fill={config.skin} />
            {mood === 'pointing' && <rect x="154" y="261" width="31" height="7" rx="3.5" fill={config.skin} />}
          </motion.g>

          <path
            d={isFather ? 'M71 179 Q110 155 149 179 L157 269 Q110 286 63 269Z' : 'M75 178 Q110 159 145 178 L151 258 Q110 273 69 258Z'}
            fill={`url(#shirt-${name})`}
          />
          <path d="M86 173 Q110 187 134 173" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="5" strokeLinecap="round" />

          <path d={isFather ? 'M80 263 L106 263 L101 315 L70 315Z' : 'M78 255 L106 255 L101 315 L70 315Z'} fill={config.pants} />
          <path d={isFather ? 'M114 263 L140 263 L150 315 L119 315Z' : 'M114 255 L142 255 L150 315 L119 315Z'} fill={config.pants} />
          <path d="M68 308 Q84 302 103 311 L103 320 L66 320Z" fill="#F7EFE2" />
          <path d="M117 311 Q137 303 152 309 L154 320 L117 320Z" fill="#F7EFE2" />

          {isMaryam && (
            <>
              <path d="M57 108 Q53 53 110 39 Q168 52 163 109 L157 166 Q145 187 110 190 Q76 184 63 164Z" fill={config.hijab!} />
              <path d="M74 159 Q64 180 63 239 Q110 257 157 239 Q155 184 145 158Z" fill={config.hijab!} />
            </>
          )}

          <ellipse cx="110" cy={isFather ? 103 : 109} rx={isFather ? 53 : 49} ry={isFather ? 57 : 54} fill={config.skin} />

          {!isMaryam && (
            <path
              d={isFather
                ? 'M56 100 Q55 40 110 39 Q166 42 164 102 Q144 77 126 69 Q90 84 57 98Z'
                : 'M62 104 Q57 54 110 51 Q159 55 159 105 Q143 76 129 75 Q104 95 62 104Z'}
              fill={config.hair}
            />
          )}
          {isFather && <path d="M64 122 Q69 162 110 169 Q151 162 157 122 Q148 169 110 175 Q73 168 64 122Z" fill="#3A2D2B" opacity=".95" />}
          {isMaryam && <path d="M72 97 Q87 64 110 64 Q137 65 149 97 Q134 82 110 81 Q89 81 72 97Z" fill={config.hijab!} />}

          <ellipse cx="91" cy="109" rx="6.5" ry={mood === 'happy' || mood === 'celebrating' ? 3 : 7} fill="#2C3336" />
          <ellipse cx="130" cy="109" rx="6.5" ry={mood === 'happy' || mood === 'celebrating' ? 3 : 7} fill="#2C3336" />
          {mood !== 'happy' && mood !== 'celebrating' && (
            <>
              <circle cx="89" cy="106" r="2" fill="#fff" />
              <circle cx="128" cy="106" r="2" fill="#fff" />
            </>
          )}
          <path
            d={mood === 'talking' ? 'M101 135 Q110 145 120 135 Q110 130 101 135Z' : mood === 'thinking' ? 'M102 139 Q110 133 119 139' : 'M98 134 Q110 148 123 134'}
            fill={mood === 'talking' ? '#8E3E43' : 'none'}
            stroke="#8E3E43"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="78" cy="128" r="7" fill="#E98078" opacity=".28" />
          <circle cx="142" cy="128" r="7" fill="#E98078" opacity=".28" />
          {mood === 'thinking' && <path d="M80 91 Q91 85 100 91 M121 91 Q132 85 141 91" fill="none" stroke="#493936" strokeWidth="4" strokeLinecap="round" />}
        </g>
      </svg>
      {label && <span className="character__label">{config.label}</span>}
    </motion.div>
  );
}
