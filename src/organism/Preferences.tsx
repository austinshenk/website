import React, {useEffect, RefObject} from "react";
import Am from "am";
import Window from "atom/Window";
import Dialog, {DialogRef} from "atom/Dialog";
import Tooltip, {Tooltips} from "molecule/Tooltip";
import usePreferences from "components/Preferences";

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
                    <Dialog dialogRef={dialogRef} onOpen={window.activate} onClose={window.deactivate} containerProps={{...Am.flex({direction: "column"})}}>
                        <section {...Am.flex({direction: "row", wrap: "no"})} style={{width: "100%"}}>
                            <span role="heading" aria-level={2} {...Am.flexItem({grow: 2})}>Accessibility</span>
                            <Tooltip content="Close">
                                <Am.Button.Component onClick={dialogRef?.current?.close} {...Am.flexItem({alignSelf: "center"})} containerBodyProps={Am.flex({justifyContent: "center", alignItems: "stretch"})}>
                                    <Am.Icon.Cross variation="outline"/>
                                </Am.Button.Component>
                            </Tooltip>
                        </section>
                        <form {...Am.flex({direction: "column", gap: "24px"})}>
                            <section {...Am.flex({direction: "column", gap: "8px"})}>
                                <span>Text Size</span>
                                <section {...Am.flex({direction: "row", justifyContent: "start"})}>
                                    <Am.Radio.Component name="textSize" onChange={(value) => preferenceSetters.setTextSize(Number(value))} initialValue={preferences.textSize.toString()}>
                                        {{label: "smaller", value: "80"}}
                                        {{label: "default", value: "100"}}
                                        {{label: "larger", value: "120"}}
                                        {{label: "largest", value: "150"}}
                                    </Am.Radio.Component>
                                </section>
                            </section>
                            <section {...Am.flex({direction: "column", gap: "8px"})}>
                                <label htmlFor="preferences-colorscheme">Color Scheme</label>
                                <Am.Select.Component id="preferences-colorscheme" onInput={(event) => preferenceSetters.setColorScheme(event.currentTarget.value)} value={preferences.colorScheme.appValue}>
                                    {{label: "system default", value: ""}}
                                    {{label: "light", value: "light"}}
                                    {{label: "dark", value: "dark"}}
                                </Am.Select.Component>
                            </section>
                            <section {...Am.flex({direction: "column", gap: "8px"})}>
                                <label htmlFor="preferences-reducemotion">Reduce Motion</label>
                                <Am.Select.Component id="preferences-reducemotion" onInput={(event) => preferenceSetters.setReducedMotion(event.currentTarget.value)} value={preferences.reducedMotion.appValue}>
                                    {{label: "system default", value: ""}}
                                    {{label: "no", value: "no-preference"}}
                                    {{label: "yes", value: "reduce"}}
                                </Am.Select.Component>
                            </section>
                        </form>
                    </Dialog>
                    {tooltip}
                </>}
            </Window.Popup>
        )}
    </Tooltips>
}