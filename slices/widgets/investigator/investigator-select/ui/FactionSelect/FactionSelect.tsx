import { selectFactionFilter, setFactionFilter, useAppDispatch, useAppSelector } from "@shared/lib";
import { Faction } from "@shared/model";
import { FactionSelect as Select, FactionSelectProps as SelectProps } from "@widgets/investigator/faction-select"; 
import { useCallback } from "react";

export type FactionSelectProps = Omit<SelectProps, 'value'>;

export const FactionSelect = (props: FactionSelectProps) => {
  const dispatch = useAppDispatch();
  const faction = useAppSelector(selectFactionFilter);

  const onChange = useCallback((faction: Faction | null) => {
    dispatch(setFactionFilter(faction))
  }, [dispatch])

  return (
    <Select
      {...props}
      onChange={onChange}
      value={faction}
    />
  );
}