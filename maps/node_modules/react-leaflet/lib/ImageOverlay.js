import { createElementObject, createLayerComponent, extendContext, updateMediaOverlay } from '@react-leaflet/core';
import { ImageOverlay as LeafletImageOverlay } from 'leaflet';
export const ImageOverlay = createLayerComponent(function createImageOveraly({ bounds , url , ...options }, ctx) {
    const overlay = new LeafletImageOverlay(url, bounds, options);
    return createElementObject(overlay, extendContext(ctx, {
        overlayContainer: overlay
    }));
}, function updateImageOverlay(overlay, props, prevProps) {
    updateMediaOverlay(overlay, props, prevProps);
    if (props.url !== prevProps.url) {
        overlay.setUrl(props.url);
    }
});
