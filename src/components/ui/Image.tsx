/** @format */

import {ImgHTMLAttributes} from "react";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
}

const Image = ({src, alt, ...rest}: IProps) => {
	return (
		<img
			src={src}
			alt={alt}
			{...rest}
		/>
	);
};

export default Image;
