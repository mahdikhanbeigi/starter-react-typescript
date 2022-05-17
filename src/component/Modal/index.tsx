import { useGlobal } from "@app/hook/global";
import { Dialog, Overlay, Content } from "./style";

export const Modal = () => {
  const { modal } = useGlobal();
  const { data, isStaticBackdrop } = modal;
  if (!data) return null;
  return (
    <Dialog>
      <Overlay
        onClick={() => {
          if (!isStaticBackdrop) {
            modal.onClose();
          }
        }}
      />
      <Content>
        {data.title && <div className="head px-3 py-2">{data.title}</div>}
        {data.children && <div className="p-3 pt-0">{data.children}</div>}
      </Content>
    </Dialog>
  );
};
