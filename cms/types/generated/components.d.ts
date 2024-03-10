import type { Schema, Attribute } from '@strapi/strapi';

export interface LinkInfoLinkInfo extends Schema.Component {
  collectionName: 'components_link_info_link_infos';
  info: {
    displayName: 'linkInfo';
    icon: 'file';
  };
  attributes: {
    title: Attribute.String;
    cover: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'link-info.link-info': LinkInfoLinkInfo;
    }
  }
}
