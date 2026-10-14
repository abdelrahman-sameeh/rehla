import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { audioManager } from '../../services/audioManager';
import { stepDemos } from '../../features/wudu/data/wuduContent';
import { GameIcon } from './GameIcon';
import handsImage from '../../assets/wudu/wash-hands.png';
import faceImage from '../../assets/wudu/wash-face.png';
import armImage from '../../assets/wudu/wash-arm.png';
import footImage from '../../assets/wudu/wash-foot.png';

type Props = {
  sceneKey: string;
  muted: boolean;
};

const demoImages: Record<string, string> = {
  hands: handsImage,
  mouth: faceImage,
  nose: faceImage,
  face: faceImage,
  head: faceImage,
  arms: armImage,
  feet: footImage,
};

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM14 5h4v14h-4z" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" /></svg>
  );
}

export function StepExplainer({ sceneKey, muted }: Props) {
  const stages = stepDemos[sceneKey];
  const [playing, setPlaying] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const narrationStarted = useRef(false);

  useEffect(() => {
    if (!playing || !stages) return;
    if (!narrationStarted.current) {
      audioManager.speak(stages[stageIndex].narration, muted);
      narrationStarted.current = true;
    }
    const timer = window.setTimeout(() => {
      if (stageIndex === stages.length - 1) {
        setPlaying(false);
        narrationStarted.current = false;
      } else {
        const next = stageIndex + 1;
        setStageIndex(next);
        audioManager.speak(stages[next].narration, muted);
      }
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [playing, stageIndex, stages, muted]);

  if (!stages?.length) return null;
  const stage = stages[stageIndex];
  const restart = () => {
    audioManager.stopNarration();
    setStageIndex(0);
    narrationStarted.current = false;
    setPlaying(true);
  };
  const toggle = () => {
    if (!playing && stageIndex === stages.length - 1) {
      restart();
      return;
    }
    if (playing) audioManager.stopNarration();
    narrationStarted.current = false;
    setPlaying((value) => !value);
  };

  return (
    <section className="step-video" aria-label="عرض توضيحي تفاعلي">
      <div className="step-video__topbar">
        <div><span className="live-dot" />عرض توضيحي تفاعلي</div>
        <span>{stageIndex + 1} / {stages.length}</span>
      </div>
      <div className={`step-video__screen focus-${stage.focus ?? 'both'}`}>
        <div className="video-arch" aria-hidden="true" />
        <div className="video-faucet" aria-hidden="true"><i /></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${sceneKey}-${stageIndex}`}
            className="video-action"
            initial={{ opacity: 0, scale: .82, x: 20 }}
            animate={{ opacity: 1, scale: [1, 1.04, 1], x: 0 }}
            exit={{ opacity: 0, scale: .9, x: -20 }}
            transition={{ duration: .45 }}
          >
            <div className={`video-action__image ${stage.focus === 'left' ? 'is-mirrored' : ''}`}><img src={demoImages[sceneKey]} alt="" /></div>
            <div className="video-action__stage-icon"><GameIcon name={stage.icon} size={46} /></div>
            {(stage.focus === 'right' || stage.focus === 'left') && (
              <div className="side-marker"><span>{stage.focus === 'right' ? 'يمين' : 'يسار'}</span><b>ابدأ هنا</b></div>
            )}
            <motion.div className="video-water" animate={playing ? { y: [0, 18, 0], opacity: [0, 1, .2] } : { opacity: .25 }} transition={{ repeat: playing ? Infinity : 0, duration: 1 }}><i /><i /><i /></motion.div>
          </motion.div>
        </AnimatePresence>
        <motion.div className="video-caption" key={stage.label} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}><b>{stage.label}</b><span>{stage.narration}</span></motion.div>
      </div>
      <div className="step-video__controls">
        <button className="video-play" onClick={toggle} aria-label={playing ? 'إيقاف الشرح' : 'تشغيل الشرح'}><PlayIcon playing={playing} /><span>{playing ? 'إيقاف' : stageIndex === stages.length - 1 ? 'إعادة العرض' : 'شغّل الشرح'}</span></button>
        <div className="video-timeline">{stages.map((item, index) => <button key={item.label} className={index === stageIndex ? 'is-current' : index < stageIndex ? 'is-done' : ''} onClick={() => { audioManager.stopNarration(); setPlaying(false); setStageIndex(index); narrationStarted.current = false; }} aria-label={`عرض: ${item.label}`}><span /></button>)}</div>
        <button className="video-restart" onClick={restart} aria-label="إعادة العرض من البداية">↻</button>
      </div>
      <p className="step-video__note">اضغط تشغيل وشوف الحركة، وبعدها جرّب بنفسك تحت.</p>
    </section>
  );
}
