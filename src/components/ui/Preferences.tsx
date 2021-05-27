import React, {useEffect, RefObject} from "react";
import Atom from "./atom";
import Window from "./molecule/Window";
import Radios from "./Radios";
import Select from "./Select";
import Dialog, {DialogRef} from "./Dialog";
import usePreferences from "../Preferences";
import {Tooltips} from "../Tooltip";

interface Props {
    dialogRef?: RefObject<DialogRef>;
    onLoad?: () => void;
}

export default function Preferences({dialogRef, onLoad}: Props) {
    const [preferences, preferenceSetters] = usePreferences();

    useEffect(() => {
        onLoad?.();
    }, []);

    return <Tooltips>
        {(windowRef, tooltip) => (
            <Window.Popup ref={windowRef} fullscreen am-dialog="">
                {(window) => <>
                    <Dialog ref={dialogRef} title={"Accessibility"} onOpen={window.activate} onClose={() => {
                        window.deactivate();
                    }}>
                        <form am-group-item="" am-group="vertical">
                            <Atom.Container variation="invisible" am-group-item="" am-group="" am-flexbox="" am-flexbox-justify-content="start">
                                <span am-group-header="">Text Size</span>
                                <Radios name="textSize" onChange={(value) => preferenceSetters.setTextSize(Number(value))} initialValue={preferences.textSize.toString()}>
                                    {{label: "smaller", value: "80"}}
                                    {{label: "default", value: "100"}}
                                    {{label: "larger", value: "120"}}
                                    {{label: "largest", value: "150"}}
                                </Radios>
                            </Atom.Container>
                            <Atom.Container variation="invisible" am-group-item="" am-group="" am-flexbox="" am-flexbox-justify-content="start">
                                <label am-group-header="" htmlFor="preferences-colorscheme">Color Scheme</label>
                                <Select id="preferences-colorscheme" am-group-item="" onChange={preferenceSetters.setColorScheme} initialValue={preferences.colorScheme.appValue}>
                                    {{label: "system default", value: ""}}
                                    {{label: "light", value: "light"}}
                                    {{label: "dark", value: "dark"}}
                                </Select>
                            </Atom.Container>
                            <Atom.Container variation="invisible" am-group-item="" am-group="" am-flexbox="" am-flexbox-justify-content="start">
                                <label am-group-header="" htmlFor="preferences-reducemotion">Reduce Motion</label>
                                <Select id="preferences-reducemotion" am-group-item="" onChange={preferenceSetters.setReducedMotion} initialValue={preferences.reducedMotion.appValue}>
                                    {{label: "system default", value: ""}}
                                    {{label: "no", value: "no-preference"}}
                                    {{label: "yes", value: "reduce"}}
                                </Select>
                            </Atom.Container>
                        </form>
                    </Dialog>
                    {tooltip}
                </>}
            </Window.Popup>
        )}
    </Tooltips>
}