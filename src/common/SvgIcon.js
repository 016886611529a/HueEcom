import React from 'react';
export default function SvgIcon({Icon, size, fill, stroke, ...props}) {
  return <Icon stroke={stroke} fill={fill} size={size} {...props} />;
}
