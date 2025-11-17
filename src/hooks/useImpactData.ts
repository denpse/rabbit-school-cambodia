"use client";
import { useTranslations } from "next-intl";
import GraduationIcon from "../../public/icons/Graduation Icon.png";
import BrownConstruction from "../../public/icons/Icons Stamp.png";
import BrownPecil from "../../public/icons/Pencil Icon.png";
import BrownRainbow from "../../public/icons/Rainbow Icon.png";
export function useImpactData() {
  const t = useTranslations();

  const impactData = [
    {
      description: t("impacts.studentsTrained.description"),
      value: 6850,
      icon: GraduationIcon.src,
    },
    {
      description: t("impacts.teachersTrained.description"),
      value: 134,
      icon: BrownConstruction.src,
    },
    {
      description: t("impacts.studentsEnrolled.description"),
      value: 850,
      icon: BrownPecil.src,
    },
    {
      description: t("impacts.classrooms.description"),
      value: 118,
      icon: BrownRainbow.src,
    },
  ];

  return impactData;
}
