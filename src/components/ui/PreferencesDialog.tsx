import React, {useState, useEffect} from "react";
import Container from "./Container";
import Radios from "./Radios";
import Select from "./Select";
import Dialog, {DialogRef} from "./Dialog";
import usePreferences from "../PreferencesStore";
import {PopupWindow} from "./Window";
import {TooltipProvider} from "../Tooltip";

export interface PreferencesDialogProps {
    dialogRef: (dialog: DialogRef) => void;
    onLoad?: () => void;
}

export default function PreferencesDialog({dialogRef, onLoad}: PreferencesDialogProps) {
    const [preferences, preferenceSetters] = usePreferences();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        if (onLoad)
            onLoad();
    }, []);
    useEffect(() => {
        dialogRef({
            open: () => setDialogOpen(true)
        });
    }, [dialogOpen]);

    return <TooltipProvider>
        {(windowRef, tooltip) => (
            <PopupWindow ref={windowRef} fullscreen am-dialog="">
                {(window) => (<>
                    <Dialog title={"Accessibility"} open={dialogOpen} onOpen={window.activate} onClose={() => {
                        setDialogOpen(false);
                        window.deactivate();
                    }}>
                        <form am-group-item="" am-group="vertical">
                            <Container invisible am-group-item="" am-group="" am-flexbox="" am-flexbox-justify-content="start">
                                <span am-group-header="">Text Size</span>
                                <Radios name="textSize" onChange={(value) => preferenceSetters.setTextSize(Number(value))} initialValue={preferences.textSize.toString()}>
                                    {{label: "smaller", value: "80"}}
                                    {{label: "default", value: "100"}}
                                    {{label: "larger", value: "120"}}
                                    {{label: "largest", value: "150"}}
                                </Radios>
                            </Container>
                            <Container invisible am-group-item="" am-group="" am-flexbox="" am-flexbox-justify-content="start">
                                <label am-group-header="" htmlFor="preferences-colorscheme">Color Scheme</label>
                                <Select id="preferences-colorscheme" am-group-item="" onChange={preferenceSetters.setColorScheme} initialValue={preferences.colorScheme.appValue}>
                                    {{label: "system default", value: ""}}
                                    {{label: "light", value: "light"}}
                                    {{label: "dark", value: "dark"}}
                                </Select>
                            </Container>
                            <Container invisible am-group-item="" am-group="" am-flexbox="" am-flexbox-justify-content="start">
                                <label am-group-header="" htmlFor="preferences-reducemotion">Reduce Motion</label>
                                <Select id="preferences-reducemotion" am-group-item="" onChange={preferenceSetters.setReducedMotion} initialValue={preferences.reducedMotion.appValue}>
                                    {{label: "system default", value: ""}}
                                    {{label: "no", value: "no-preference"}}
                                    {{label: "yes", value: "reduce"}}
                                </Select>
                            </Container>
                        </form>
                    </Dialog>
                    {tooltip}
                </>)}
            </PopupWindow>
        )}
    </TooltipProvider>
}