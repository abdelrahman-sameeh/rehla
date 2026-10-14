import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { audioManager } from "../../services/audioManager";
import { stepDemos } from "../../features/wudu/data/wuduContent";
import { GameIcon } from "./GameIcon";
import handsImage from "../../assets/wudu/wash-hands.webp";
import armImage from "../../assets/wudu/wash-arm.webp";
import footImage from "../../assets/wudu/wash-foot.webp";
import mouthTakeWaterImage from "../../assets/wudu/mouth-take-water.webp";
import mouthRinseImage from "../../assets/wudu/mouth-rinse.webp";
import mouthExpelImage from "../../assets/wudu/mouth-expel.webp";
import noseInhaleImage from "../../assets/wudu/nose-inhale.webp";
import noseExpelImage from "../../assets/wudu/nose-expel.webp";
import faceWashImage from "../../assets/wudu/wash-face-clear.webp";
import headWipeImage from "../../assets/wudu/wipe-head.webp";
import earsWipeImage from "../../assets/wudu/wipe-ears.webp";
import khadijaMouthRinseImage from "../../assets/wudu/khadija-mouth-rinse.webp";
import khadijaMouthExpelImage from "../../assets/wudu/khadija-mouth-expel.webp";
import khadijaNoseInhaleImage from "../../assets/wudu/khadija-nose-inhale.webp";
import khadijaNoseExpelImage from "../../assets/wudu/khadija-nose-expel.webp";
import khadijaFaceWashImage from "../../assets/wudu/khadija-wash-face.webp";
import khadijaHeadWipeImage from "../../assets/wudu/khadija-wipe-head.webp";
import khadijaEarsWipeImage from "../../assets/wudu/khadija-wipe-ears.webp";

type ChildCharacter = "omar" | "maryam";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const toArabicDigits = (value: number) =>
  String(value).replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)]);

type Props = {
  sceneKey: string;
  muted: boolean;
  character: ChildCharacter;
};

const omarDemoImages: Record<string, string> = {
  hands: handsImage,
  "mouth-water": mouthTakeWaterImage,
  "mouth-rinse": mouthRinseImage,
  "mouth-out": mouthExpelImage,
  "nose-inhale": noseInhaleImage,
  "nose-expel": noseExpelImage,
  "face-wash": faceWashImage,
  "head-wipe": headWipeImage,
  "ears-wipe": earsWipeImage,
  arms: armImage,
  feet: footImage,
};

const khadijaDemoImages: Record<string, string> = {
  ...omarDemoImages,
  "mouth-rinse": khadijaMouthRinseImage,
  "mouth-out": khadijaMouthExpelImage,
  "nose-inhale": khadijaNoseInhaleImage,
  "nose-expel": khadijaNoseExpelImage,
  "face-wash": khadijaFaceWashImage,
  "head-wipe": khadijaHeadWipeImage,
  "ears-wipe": khadijaEarsWipeImage,
};

function PlayIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5h4v14H7zM14 5h4v14h-4z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 5 11 7-11 7V5Z" />
    </svg>
  );
}

export function StepExplainer({ sceneKey, muted, character }: Props) {
  const stages = stepDemos[sceneKey];
  const demoImages =
    character === "maryam" ? khadijaDemoImages : omarDemoImages;
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
        <div>
          <span className="live-dot" />
          عرض توضيحي تفاعلي
        </div>
        <span>الخطوة {toArabicDigits(stageIndex + 1)} من {toArabicDigits(stages.length)}</span>
      </div>
      <div className={`step-video__screen focus-${stage.focus ?? "both"}`}>
        <div className="video-arch" aria-hidden="true" />
        <div className="video-faucet" aria-hidden="true">
          <i />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${character}-${sceneKey}-${stageIndex}`}
            className="video-action"
            initial={{ opacity: 0, scale: 0.82, x: 20 }}
            animate={{ opacity: 1, scale: [1, 1.04, 1], x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ duration: 0.45 }}
          >
            <div
              className={`video-action__image ${stage.focus === "left" ? "is-mirrored" : ""}`}
            >
              <img src={demoImages[stage.imageKey ?? sceneKey]} alt="" />
            </div>
            <div className="video-action__stage-icon">
              <GameIcon name={stage.icon} size={46} />
            </div>
            {(stage.focus === "right" || stage.focus === "left") && (
              <div className="side-marker">
                <span>{stage.focus === "right" ? "يمين" : "يسار"}</span>
                <b>ابدأ هنا</b>
              </div>
            )}
            <motion.div
              className="video-water"
              animate={
                playing
                  ? { y: [0, 18, 0], opacity: [0, 1, 0.2] }
                  : { opacity: 0.25 }
              }
              transition={{ repeat: playing ? Infinity : 0, duration: 1 }}
            >
              <i />
              <i />
              <i />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <motion.div
          className="video-caption"
          key={stage.label}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <b>{stage.label}</b>
          <span>{stage.narration}</span>
        </motion.div>
      </div>
      <div className="step-video__controls">
        <button
          className="video-play"
          onClick={toggle}
          aria-label={playing ? "إيقاف الشرح" : "تشغيل الشرح"}
        >
          <PlayIcon playing={playing} />
          <span>
            {playing
              ? "إيقاف"
              : stageIndex === stages.length - 1
                ? "إعادة العرض"
                : "شغّل الشرح"}
          </span>
        </button>
        <div className="video-timeline">
          {stages.map((item, index) => (
            <button
              key={item.label}
              className={
                index === stageIndex
                  ? "is-current"
                  : index < stageIndex
                    ? "is-done"
                    : ""
              }
              onClick={() => {
                audioManager.stopNarration();
                setPlaying(false);
                setStageIndex(index);
                narrationStarted.current = false;
              }}
              aria-label={`عرض: ${item.label}`}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          className="video-restart"
          onClick={restart}
          aria-label="إعادة العرض من البداية"
        >
          ↻
        </button>
      </div>
      <p className="step-video__note">
        اضغط تشغيل وشوف الحركة، وبعدها جرّب بنفسك تحت.
      </p>
    </section>
  );
}
