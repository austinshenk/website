import React from "react";
import Am from "am";
import Basic from "template/Basic";

const theme: Am.Theme = Am.ThemeGenerator({
    spacing: (amount) => `${4 * (amount ?? 1)}px`,
});

export default function Editor() {
    return <Basic theme={theme}
                  title="Visual Web Programming"
                  description="A visual programming interface for web languages">
            {{}}
            {() => <>
                <main id="main" tabIndex={0}>
                    Hello
                </main>
            </>}
    </Basic>
}