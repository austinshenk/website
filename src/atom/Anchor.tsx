import React from "react";
import Am from "am";

type CleanAnchorProps = Omit<Am.Anchor.Props, "href">;

type ExternalAnchorProps = CleanAnchorProps & { url: string };

function ExternalAnchor({url, ...props}: ExternalAnchorProps, ref: React.ForwardedRef<HTMLAnchorElement>) {
    return <Am.Anchor.Component href={url} {...props} ref={ref} />;
}

type InternalElementAnchorProps = CleanAnchorProps & { elementId: string };

function InternalElementAnchor({elementId, ...props}: InternalElementAnchorProps, ref: React.ForwardedRef<HTMLAnchorElement>) {
    return <Am.Anchor.Component href={`#${elementId}`} {...props} ref={ref} />;
}

type InternalPathAnchorProps = CleanAnchorProps & { path: string[] };

function InternalPathAnchor({path, ...props}: InternalPathAnchorProps, ref: React.ForwardedRef<HTMLAnchorElement>) {
    return <Am.Anchor.Component href={path.join("/")} {...props} ref={ref} />;
}

export default {
    External: React.forwardRef<HTMLAnchorElement, ExternalAnchorProps>(ExternalAnchor),
    InternalElement: React.forwardRef<HTMLAnchorElement, InternalElementAnchorProps>(InternalElementAnchor),
    InternalPath: React.forwardRef<HTMLAnchorElement, InternalPathAnchorProps>(InternalPathAnchor)
}