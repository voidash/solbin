import { createElementObject, createTileLayerComponent, updateGridLayer, withPane } from '@react-leaflet/core';
import { TileLayer as LeafletTileLayer } from 'leaflet';
export const TileLayer = createTileLayerComponent(function createTileLayer({ url , ...options }, context) {
    const layer = new LeafletTileLayer(url, withPane(options, context));
    return createElementObject(layer, context);
}, updateGridLayer);
