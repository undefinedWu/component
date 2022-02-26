import React, { FC, useMemo, useState } from "react";
import { AlertProps, IconType } from "./index.type";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import cs from "classnames";
import styles from "./index.module.css";

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  const {
    type = "info",
    closable = true,
    content,
    showIcon = false,
    onClose: close,
    afterClose,
    style = {},
    className,
  } = props;
  const [curContent, setCurContent] = useState<React.ReactNode | undefined>(
    undefined
  );
  const onClose = useMemo(() => {
    function* iteratorContent() {
      for (const item of content) {
        yield item;
      }
      return undefined;
    }
    const iter = iteratorContent();
    const { value } = iter.next();
    setCurContent(value);
    return () => {
      const { value } = iter.next();

      setCurContent(() => {
        close?.();
        if (value === undefined) {
          afterClose?.();
        }
        return value;
      });
    };
  }, [content]);
  return curContent ? (
    <div
      className={cs([styles.wrapper, styles[type], className])}
      style={style}
    >
      <div
        className={cs([
          {
            hidden: !showIcon,
          },
          styles["left-icon"],
        ])}
      >
        <RenderLeftIcon type={type} />
      </div>
      <div className={styles.content}>{curContent}</div>
      <>
        {closable && (
          <CloseOutlined className={styles["close-icon"]} onClick={onClose} />
        )}
      </>
    </div>
  ) : null;
};

// 背景             图标颜色      border
// #e6f7ff -> info  #1890ff     #91d5ff
// #b7eb8f -> sucess #52c41a    #b7eb8f
// #ffe58f -> warning #faad14   #ffe58f
// #fff2f0 -> error #ff4d4f     #ffccc7

const RenderLeftIcon: FC<{ type: IconType }> = (props) => {
  const { type } = props;
  switch (type) {
    case "success":
      return <CheckCircleOutlined className={styles["success-icon"]} />;
    case "warning":
      return <ExclamationCircleOutlined className={styles["warning-icon"]} />;
    case "error":
      return <CloseCircleOutlined className={styles["error-icon"]} />;
    case "info":
    default:
      return <InfoCircleOutlined className={styles["info-icon"]} />;
  }
};

export { Alert };
