import styles from "./container.module.scss";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = (props: ContainerProps) => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

export { Container };
