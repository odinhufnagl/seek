import React, { Dispatch } from 'react';

import { ModalList } from '../../components';
import { translate } from '../../i18n';
import { ChatModel, IconVariant } from '../../types';

type Props = {
  album: ChatModel;
  visible: boolean;
  setVisible: Dispatch<boolean>;
};

const AlbumModalList = ({ album, visible, setVisible }: Props) => {
  const translateKey = 'components.albumModalList.';
  return (
    <ModalList
      header={album.name}
      subHeader={album.creator.name}
      image={album.coverImage?.url}
      visible={visible}
      setVisible={setVisible}
      items={[
        {
          title: translate(translateKey + 'alternatives.qr'),
          icon: 'qr' as IconVariant,
          iconSize: 22,
        },
        {
          title: translate(translateKey + 'alternatives.images'),
          icon: 'image' as IconVariant,
          iconSize: 28,
        },
        {
          title: translate(translateKey + 'alternatives.settings'),
          icon: 'settings' as IconVariant,
          iconSize: 26,
        },
      ]}
    />
  );
};

export default AlbumModalList;
