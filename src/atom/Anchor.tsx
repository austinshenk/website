import Am from "am";

type CleanAnchorProps = Omit<Am.Anchor.Props, "href">

function ExternalAnchor({url, ...props}: CleanAnchorProps & { url: string }) {
    return <Am.Anchor.Component href={url} {...props} />;
}

function InternalElementAnchor({elementId, ...props}: CleanAnchorProps & { elementId: string }) {
    return <Am.Anchor.Component href={`#${elementId}`} {...props} />;
}

function InternalPathAnchor({path, ...props}: CleanAnchorProps & { path: string[] }) {
    return <Am.Anchor.Component href={path.join("/")} {...props} />;
}

export default {
    External: ExternalAnchor,
    InternalElement: InternalElementAnchor,
    InternalPath: InternalPathAnchor
}