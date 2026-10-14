import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { GameIcon } from '../../components/game/GameIcon';
import { StepExplainer } from '../../components/game/StepExplainer';
import trioArt from '../../assets/characters/rehla-character-trio.png';
import omarGuide from '../../assets/characters/omar-guide.png';
import maryamGuide from '../../assets/characters/maryam-guide.png';
import handsImage from '../../assets/wudu/wash-hands.png';
import armImage from '../../assets/wudu/wash-arm.png';
import footImage from '../../assets/wudu/wash-foot.png';
import mouthTakeWaterImage from '../../assets/wudu/mouth-take-water.png';
import mouthRinseImage from '../../assets/wudu/mouth-rinse.png';
import mouthExpelImage from '../../assets/wudu/mouth-expel.png';
import noseInhaleImage from '../../assets/wudu/nose-inhale.png';
import noseExpelImage from '../../assets/wudu/nose-expel.png';
import faceWashImage from '../../assets/wudu/wash-face-clear.png';
import headWipeImage from '../../assets/wudu/wipe-head.png';
import earsWipeImage from '../../assets/wudu/wipe-ears.png';
import { audioManager } from '../../services/audioManager';
import { useProgressStore } from '../../stores/progressStore';
import { challengeSteps, quizAnswers, sequenceActivities, wuduScenes } from './data/wuduContent';

const TOTAL_STARS = 10;
type ChildCharacter = 'omar' | 'maryam';

const childProfiles = {
  omar: { name: 'عمر', image: omarGuide, description: 'مغامر ومتحمّس' },
  maryam: { name: 'مريم', image: maryamGuide, description: 'ذكية وشجاعة' },
};

const wuduImages: Record<string, string> = {
  hands: handsImage,
  'mouth-water': mouthTakeWaterImage,
  'mouth-rinse': mouthRinseImage,
  'mouth-out': mouthExpelImage,
  'nose-inhale': noseInhaleImage,
  'nose-expel': noseExpelImage,
  nose: noseInhaleImage,
  'face-wash': faceWashImage,
  face: faceWashImage,
  arms: armImage,
  'head-wipe': headWipeImage,
  'ears-wipe': earsWipeImage,
  head: headWipeImage,
  feet: footImage,
  'mouth-nose': mouthRinseImage,
};

function ClearWuduImage({ step, mirrored = false, className = '' }: { step: string; mirrored?: boolean; className?: string }) {
  const image = wuduImages[step];
  if (!image) return <GameIcon name={step} />;
  return <img className={`clear-wudu-image ${mirrored ? 'is-mirrored' : ''} ${className}`} src={image} alt="" />;
}

function JourneyCharacter({ character }: { character: ChildCharacter }) {
  const profile = childProfiles[character];
  return (
    <motion.div className="selected-journey-character" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }} transition={{ opacity: { duration: .35 }, scale: { duration: .35 }, y: { duration: 3.2, repeat: Infinity } }}>
      <img src={profile.image} alt={`${profile.name} يشارك في رحلة الوضوء`} />
      <span>أنا {profile.name}، يلا نطبّق سوا!</span>
    </motion.div>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm13-1 5 8m0-8-5 8" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Zm12 0a5 5 0 0 1 0 8m2-12a9 9 0 0 1 0 14" /></svg>
  );
}

function MapIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15" /></svg>;
}

function ReplayIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2-5.3L3 10m0-6v6h6" /></svg>;
}

function SceneBackground({ environment }: { environment: string }) {
  return (
    <div className={`scene-bg scene-bg--${environment}`} aria-hidden="true">
      <div className="scene-bg__sky"><span className="cloud cloud--one" /><span className="cloud cloud--two" /></div>
      {environment === 'garden' && <><div className="sun" /><div className="garden-wall"><i /><i /><i /><i /><i /></div><div className="tree tree--left" /><div className="tree tree--right" /><div className="garden-path" /><div className="flowers" /></>}
      {environment === 'home' && <><div className="home-wall-pattern" /><div className="arch-window"><span /></div><div className="floor-rug" /><div className="shelf"><i /><i /><i /></div></>}
      {environment === 'wudu' && <><div className="tile-pattern" /><div className="arch-window arch-window--wudu"><span /></div><div className="floor-rug floor-rug--wudu" /><div className="plant"><i /></div></>}
      {environment === 'celebration' && <><div className="celebration-rays" /><div className="confetti"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="mosque-silhouette" /></>}
    </div>
  );
}

function DialogueBubble({ text, hint, speaker, onReplay }: { text: string; hint?: string; speaker: string; onReplay: () => void }) {
  return (
    <motion.div className="dialogue" initial={{ opacity: 0, scale: 0.92, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', delay: 0.18 }}>
      <div className="dialogue__speaker">{speaker}</div>
      <p>{text}</p>
      {hint && <p className="dialogue__hint">{hint}</p>}
      <button className="dialogue__replay" onClick={onReplay} aria-label="إعادة سماع الحوار" title="إعادة السماع"><ReplayIcon /></button>
    </motion.div>
  );
}

function Feedback({ type, text }: { type: 'success' | 'error'; text: string }) {
  return <motion.div className={`feedback feedback--${type}`} initial={{ opacity: 0, y: 18, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} role="status"><span>{type === 'success' ? '✓' : '↻'}</span>{text}</motion.div>;
}

function PrimaryButton({ children, onClick, disabled = false, className = '' }: { children: ReactNode; onClick: () => void; disabled?: boolean; className?: string }) {
  return <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className={`primary-btn ${className}`} onClick={onClick} disabled={disabled}>{children}<span aria-hidden="true">←</span></motion.button>;
}

function IntroScene({ onStart, hasProgress, onContinue, selectedCharacter, onSelectCharacter }: { onStart: () => void; hasProgress: boolean; onContinue: () => void; selectedCharacter: ChildCharacter | null; onSelectCharacter: (character: ChildCharacter) => void }) {
  return (
    <div className="intro-scene scene-content">
      <div className="intro-scene__copy">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>مغامرة جديدة • ١٠ نجوم</motion.div>
        <h1>رحلة الوضوء<br /><span>مع عمر ومريم</span></h1>
        <DialogueBubble text="يبه، نبغى نصلي، وش نسوي أول؟" hint="قبل الصلاة لازم نتوضأ. يلا نتعلم الوضوء سوا!" speaker="عمر ومريم مع بابا" onReplay={() => audioManager.speak('يبه، نبغى نصلي، وش نسوي أول؟ قبل الصلاة لازم نتوضأ. يلا نتعلم الوضوء سوا!', useProgressStore.getState().muted)} />
        <div className="character-picker" role="group" aria-label="اختر شخصيتك">
          <div className="character-picker__title"><b>مين بيكمل الرحلة؟</b><span>اختر شخصيتك</span></div>
          {(Object.entries(childProfiles) as [ChildCharacter, typeof childProfiles.omar][]).map(([key, profile]) => (
            <motion.button key={key} whileTap={{ scale: .96 }} className={selectedCharacter === key ? 'is-selected' : ''} onClick={() => onSelectCharacter(key)} aria-pressed={selectedCharacter === key}>
              <span className="character-picker__portrait"><img src={profile.image} alt="" /></span>
              <span><b>{profile.name}</b><small>{profile.description}</small></span>
              <i>{selectedCharacter === key ? '✓' : ''}</i>
            </motion.button>
          ))}
        </div>
        <div className="intro-scene__actions">
          {hasProgress && <PrimaryButton onClick={onContinue} disabled={!selectedCharacter}>نكمل من وين وقفنا</PrimaryButton>}
          <button className={hasProgress ? 'secondary-btn' : 'primary-btn'} onClick={onStart} disabled={!selectedCharacter}>{hasProgress ? 'ابدأ رحلة جديدة' : <>يلا نبدأ الرحلة <span aria-hidden="true">←</span></>}</button>
        </div>
        {!selectedCharacter && <p className="character-picker__hint">اختر عمر أو مريم عشان تبدأ الرحلة</p>}
      </div>
      <motion.div className="character-stage character-stage--intro art-trio-stage" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: [0, -5, 0] }} transition={{ opacity: { duration: .6 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}>
        <img src={trioArt} alt="عمر ومريم ووالدهما يرحبون بكم في رحلة الوضوء" />
      </motion.div>
      <motion.div className="adhan-note" animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3 }}><b>حَيَّ على الصلاة</b><span>الأذان يُرفع الآن</span></motion.div>
    </div>
  );
}

function ActivityShell({ icon, instruction, children }: { icon: string; instruction: string; children: ReactNode }) {
  return <motion.section className="activity-card" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}><div className="activity-card__title"><span>{icon}</span><h2>{instruction}</h2></div>{children}</motion.section>;
}

function QuizScene({ onDone, muted }: { onDone: () => void; muted: boolean }) {
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const answer = (correct: boolean) => {
    if (feedback === 'success') return;
    if (correct) { setFeedback('success'); audioManager.tone('success', muted); }
    else { setFeedback('error'); audioManager.tone('error', muted); window.setTimeout(() => setFeedback(null), 1100); }
  };
  return (
    <ActivityShell icon="✦" instruction="وش نسوي قبل الصلاة؟">
      <div className="answer-grid">{quizAnswers.map((item) => <motion.button key={item.id} whileTap={{ scale: 0.96 }} className={`answer-card ${feedback === 'success' && item.correct ? 'is-correct' : ''}`} onClick={() => answer(item.correct)} disabled={feedback === 'success'}><GameIcon name={item.icon} /><span>{item.label}</span></motion.button>)}</div>
      {feedback === 'success' && <><Feedback type="success" text="إجابة ممتازة! الوضوء يجهّزنا للصلاة." /><PrimaryButton onClick={onDone}>يلا نروح للمغسلة</PrimaryButton></>}
      {feedback === 'error' && <Feedback type="error" text="قريب! فكّر شوي: وش نسوي عشان نستعد للصلاة؟" />}
    </ActivityShell>
  );
}

function WaterDemo({ target, active }: { target: string; active: boolean }) {
  return (
    <div className={`water-demo water-demo--${target} ${active ? 'is-active' : ''}`} aria-hidden="true">
      <div className="sink"><div className="sink__tap" /><div className="sink__basin" /><motion.div className="water-stream" animate={active ? { scaleY: [0, 1, 0.7], opacity: [0, 1, 1] } : { scaleY: 0, opacity: 0 }} /></div>
      <div className="demo-target"><ClearWuduImage step={target === 'face' ? 'face' : 'hands'} /></div>
      {active && <><motion.i className="splash splash--1" animate={{ x: [-4, 12], y: [0, -22], opacity: [1, 0] }} transition={{ duration: 0.7 }} /><motion.i className="splash splash--2" animate={{ x: [4, -13], y: [0, -18], opacity: [1, 0] }} transition={{ duration: 0.7, delay: 0.08 }} /></>}
    </div>
  );
}

function CounterScene({ sceneKey, onDone, muted }: { sceneKey: string; onDone: () => void; muted: boolean }) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const tap = () => {
    if (count >= 3 || active) return;
    setActive(true); audioManager.tone('tap', muted);
    window.setTimeout(() => { setCount((value) => { const next = value + 1; if (next === 3) audioManager.tone('success', muted); return next; }); setActive(false); }, 620);
  };
  return (
    <ActivityShell icon="💧" instruction={sceneKey === 'face' ? 'اغسل الوجه ٣ مرات' : 'اغسل الكفين ٣ مرات'}>
      <StepExplainer sceneKey={sceneKey} muted={muted} />
      <button className="demo-button" onClick={tap} disabled={count >= 3 || active} aria-label="تشغيل الماء وإكمال غسلة"><WaterDemo target={sceneKey} active={active} /><span>{active ? 'الماء يجري...' : count === 3 ? 'أحسنت!' : 'اضغط لتشغيل الماء'}</span></button>
      <div className="wash-counter" aria-label={`${count} من 3 مرات`}>{[1, 2, 3].map((step) => <motion.span key={step} className={step <= count ? 'is-done' : ''} animate={step === count ? { scale: [1, 1.25, 1] } : {}}>{step <= count ? '✓' : step}</motion.span>)}</div>
      {count === 3 && <><Feedback type="success" text="رائع! أكملت الثلاث مرات." /><PrimaryButton onClick={onDone}>الخطوة التالية</PrimaryButton></>}
    </ActivityShell>
  );
}

function SequenceScene({ sceneKey, onDone, muted }: { sceneKey: string; onDone: () => void; muted: boolean }) {
  const steps = sequenceActivities[sceneKey];
  const [index, setIndex] = useState(0);
  const [errorId, setErrorId] = useState<string | null>(null);
  const choose = (id: string) => {
    if (index >= steps.length) return;
    if (steps[index].id === id) { audioManager.tone(index + 1 === steps.length ? 'success' : 'tap', muted); setIndex((value) => value + 1); setErrorId(null); }
    else { setErrorId(id); audioManager.tone('error', muted); window.setTimeout(() => setErrorId(null), 700); }
  };
  return (
    <ActivityShell icon="١ · ٢" instruction="اختر الحركات بالترتيب الصحيح">
      <StepExplainer sceneKey={sceneKey} muted={muted} />
      <div className="sequence-progress">{steps.map((step, i) => <span key={step.id} className={i < index ? 'is-done' : i === index ? 'is-current' : ''}>{i < index ? '✓' : i + 1}</span>)}</div>
      <div className="sequence-grid">{steps.map((step, i) => <motion.button key={step.id} animate={errorId === step.id ? { x: [0, 8, -8, 0] } : {}} className={`sequence-card ${i < index ? 'is-done' : ''} ${errorId === step.id ? 'is-error' : ''}`} onClick={() => choose(step.id)} disabled={i < index || index >= steps.length}><ClearWuduImage step={step.imageKey ?? sceneKey} mirrored={step.id.includes('left')} /><b>{step.label}</b><small>{i < index ? 'تمت' : 'اضغط هنا'}</small></motion.button>)}</div>
      {errorId && <Feedback type="error" text="خلّنا نبدأ بالخطوة الأولى." />}
      {index === steps.length && <><Feedback type="success" text="ترتيب صحيح! أحسنت يا بطل." /><PrimaryButton onClick={onDone}>الخطوة التالية</PrimaryButton></>}
    </ActivityShell>
  );
}

function ChallengeScene({ onDone, muted }: { onDone: () => void; muted: boolean }) {
  const shuffled = useMemo(() => [challengeSteps[3], challengeSteps[0], challengeSteps[5], challengeSteps[2], challengeSteps[1], challengeSteps[4]], []);
  const [selected, setSelected] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const pick = (id: string) => {
    if (selected.includes(id) || selected.length === challengeSteps.length) return;
    const expected = challengeSteps[selected.length].id;
    if (id === expected) { const next = [...selected, id]; setSelected(next); audioManager.tone(next.length === challengeSteps.length ? 'success' : 'tap', muted); }
    else { setWrong(id); audioManager.tone('error', muted); window.setTimeout(() => setWrong(null), 700); }
  };
  return (
    <ActivityShell icon="🏆" instruction="رتّب خطوات الوضوء">
      <p className="challenge-help">اختر الخطوة الأولى، وبعدها الثانية... لين يكتمل المسار.</p>
      <div className="order-track" aria-label="الخطوات المرتبة">{challengeSteps.map((step, i) => { const chosen = selected[i] === step.id; return <div className={chosen ? 'is-filled' : ''} key={step.id}><span>{chosen ? <GameIcon name={step.icon} size={44} /> : i + 1}</span><small>{chosen ? step.label : '؟'}</small></div>; })}</div>
      <div className="challenge-grid">{shuffled.map((step) => <motion.button key={step.id} animate={wrong === step.id ? { rotate: [0, -4, 4, 0] } : {}} className={`${selected.includes(step.id) ? 'is-picked' : ''} ${wrong === step.id ? 'is-error' : ''}`} onClick={() => pick(step.id)} disabled={selected.includes(step.id)}><ClearWuduImage step={step.id} /><span>{step.label}</span></motion.button>)}</div>
      {wrong && <Feedback type="error" text={`مو هذي الخطوة رقم ${selected.length + 1}. جرّب مرة ثانية!`} />}
      {selected.length === challengeSteps.length && <><Feedback type="success" text="ممتاز! رتّبت خطوات الوضوء كلها صح." /><PrimaryButton onClick={onDone}>خذ وسامك</PrimaryButton></>}
    </ActivityShell>
  );
}

function CompleteScene({ stars, onReplay, onMap, selectedCharacter }: { stars: number; onReplay: () => void; onMap: () => void; selectedCharacter: ChildCharacter }) {
  return (
    <div className="complete-scene scene-content">
      <motion.div className="badge" initial={{ scale: 0, rotate: -18 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 140, delay: 0.2 }}><div className="badge__inner"><span>★</span><b>بطل<br />الوضوء</b></div></motion.div>
      <div className="complete-scene__copy"><span className="eyebrow">أكملت الرحلة بنجاح</span><h1>ما شاء الله!</h1><p>الحين تعلّمنا الوضوء خطوة بخطوة!</p><div className="earned-stars"><span>★</span><b>{Math.min(stars, TOTAL_STARS)} / {TOTAL_STARS}</b><small>نجوم الرحلة</small></div><div className="complete-actions"><PrimaryButton onClick={onReplay}>العب من جديد</PrimaryButton><button className="secondary-btn" onClick={onMap}>خريطة الرحلة</button></div></div>
      <motion.div className="character-stage character-stage--complete selected-complete-character" animate={{ y: [0, -7, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}><img src={childProfiles[selectedCharacter].image} alt={`${childProfiles[selectedCharacter].name} يحتفل بإكمال رحلة الوضوء`} /></motion.div>
    </div>
  );
}

function JourneyMap({ currentScene, completed, onSelect, onClose }: { currentScene: number; completed: number[]; onSelect: (id: number) => void; onClose: () => void }) {
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.div className="journey-map" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 12 }} onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="خريطة الرحلة">
        <button className="modal-close" onClick={onClose} aria-label="إغلاق">×</button>
        <div className="journey-map__heading"><span>خريطة الرحلة</span><h2>مغامرتنا خطوة بخطوة</h2></div>
        <div className="map-path">{wuduScenes.map((mapScene, index) => { const unlocked = index <= currentScene || completed.includes(index) || mapScene.id === 0; const isDone = completed.includes(mapScene.id) || mapScene.id === 10 && currentScene === 10; return <button key={mapScene.key} className={`${unlocked ? 'is-unlocked' : ''} ${isDone ? 'is-done' : ''} ${mapScene.id === currentScene ? 'is-current' : ''}`} disabled={!unlocked} onClick={() => { onSelect(mapScene.id); onClose(); }}><span>{isDone ? '✓' : unlocked ? mapScene.id + 1 : '⌁'}</span><b>{mapScene.shortTitle}</b></button>; })}</div>
        <p className="map-note">يمكنك إعادة أي خطوة فتحتها من قبل.</p>
      </motion.div>
    </motion.div>
  );
}

export function WuduJourney() {
  const { currentScene, completedScenes, stars, muted, selectedCharacter, setCurrentScene, completeScene, setMuted, setSelectedCharacter, finishJourney, resetJourney } = useProgressStore();
  const [displayScene, setDisplayScene] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const safeCurrent = Math.min(Math.max(currentScene, 0), wuduScenes.length - 1);
  const scene = wuduScenes[displayScene];
  const activeCharacter = selectedCharacter ?? 'omar';

  useEffect(() => { if (currentScene !== safeCurrent) setCurrentScene(safeCurrent); }, [currentScene, safeCurrent, setCurrentScene]);
  useEffect(() => () => audioManager.stopNarration(), []);

  const speakerName = scene.speaker === 'father' ? 'بابا' : childProfiles[activeCharacter].name;
  const goTo = (id: number) => { audioManager.stopNarration(); setDisplayScene(Math.min(Math.max(id, 0), 10)); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const startFresh = () => {
    if (!selectedCharacter) return;
    if (safeCurrent > 0 && !window.confirm('تبغى تبدأ رحلة جديدة من البداية؟ راح تبدأ النجوم من جديد.')) return;
    resetJourney(); completeScene(0, 'intro'); goTo(1);
  };
  const finishScene = () => { completeScene(scene.id, scene.key); if (scene.id === 9) { finishJourney(); goTo(10); } else goTo(scene.id + 1); };
  const sceneActivity = () => {
    if (scene.kind === 'quiz') return <QuizScene onDone={finishScene} muted={muted} />;
    if (scene.kind === 'counter') return <CounterScene key={scene.key} sceneKey={scene.key} onDone={finishScene} muted={muted} />;
    if (scene.kind === 'sequence') return <SequenceScene key={scene.key} sceneKey={scene.key} onDone={finishScene} muted={muted} />;
    if (scene.kind === 'challenge') return <ChallengeScene onDone={finishScene} muted={muted} />;
    return null;
  };

  return (
    <main className="game-shell" dir="rtl">
      <header className="game-header">
        <button className="brand" onClick={() => goTo(0)} aria-label="العودة إلى البداية"><span className="brand__mark">ر</span><span><b>رِحلة</b><small>نتعلم ونستمتع</small></span></button>
        <div className="header-progress" aria-label={`تقدم الرحلة ${Math.min(safeCurrent, 10)} من 10`}><span style={{ width: `${Math.min(safeCurrent, 10) * 10}%` }} /><b>{safeCurrent === 0 ? 'جاهزين؟' : `المحطة ${Math.min(safeCurrent, 10)} من ١٠`}</b></div>
        <div className="header-actions"><div className="star-score" title="النجوم"><span>★</span><b>{stars}</b></div><button className="icon-btn" onClick={() => setShowMap(true)} aria-label="فتح خريطة الرحلة"><MapIcon /></button><button className="icon-btn" onClick={() => setMuted(!muted)} aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}><SoundIcon muted={muted} /></button></div>
      </header>
      <section className={`game-world game-world--${scene.environment}`}>
        <SceneBackground environment={scene.environment} />
        <AnimatePresence mode="wait">
          <motion.div key={scene.id} className="scene-layer" initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -36 }} transition={{ duration: 0.35 }}>
            {scene.kind === 'intro' ? <IntroScene onStart={startFresh} hasProgress={safeCurrent > 0} onContinue={() => selectedCharacter && goTo(safeCurrent)} selectedCharacter={selectedCharacter} onSelectCharacter={setSelectedCharacter} /> : scene.kind === 'complete' ? <CompleteScene stars={stars} selectedCharacter={activeCharacter} onReplay={() => { resetJourney(); goTo(0); }} onMap={() => setShowMap(true)} /> : (
              <div className="learning-scene scene-content">
                <div className="lesson-guide"><div className="lesson-heading"><span>المحطة {scene.id}</span><h1>{scene.title}</h1></div><div className="guide-character"><JourneyCharacter character={activeCharacter} /></div><DialogueBubble text={scene.dialogue} speaker={speakerName} onReplay={() => audioManager.speak(scene.dialogue, muted)} /><div className="lesson-tip"><span>💡</span><p>{scene.instruction}</p></div></div>
                <div className="lesson-activity">{sceneActivity()}</div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
      <footer className="game-footer"><span>رحلة آمنة بلا إعلانات</span><b>✦</b><span>تقدمك محفوظ على جهازك</span></footer>
      <AnimatePresence>{showMap && <JourneyMap currentScene={safeCurrent} completed={completedScenes} onSelect={goTo} onClose={() => setShowMap(false)} />}</AnimatePresence>
    </main>
  );
}
