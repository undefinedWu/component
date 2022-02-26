import { CSSProperties, ReactNode } from "react";

export type IconType = "info" | "success" | "warning" | "error"

export interface AlertProps {
    // 表示传递的样式
    style?: CSSProperties;
    className?: string;
    onClose?: () => void;
    afterClose?: () => void;
    // 表示左边图标的类型
    type?: IconType;
    content: ReactNode[];
    showIcon?: boolean;
    // 右边的图标是否可以关闭
    closable?: boolean;
}
