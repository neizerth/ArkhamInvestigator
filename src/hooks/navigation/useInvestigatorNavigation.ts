import { changeLanguage } from "@/store/features/language/language";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../useAppDispatch";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../useAppSelector";
import { selectLoading } from "@/store/features/app/app";
import { selectStories } from "@/store/features/stories/stories";
import { prop, propEq } from "ramda";
import { setInvesigator } from "@/store/features/investigator/investigator";

export const useLanguageNavigation = () => {
  const dispatch = useAppDispatch();
  const stories = useAppSelector(selectStories);
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    if (!id || stories.length === 0) {
      return;
    }
    const investigators = stories.map(prop('investigators')).flat();
    const investigator = investigators.find(propEq(id, 'code'));
    if (!investigator) {
      return;
    }
    dispatch(setInvesigator(investigator));

  }, [id, stories]);
}