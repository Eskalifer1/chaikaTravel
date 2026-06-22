import dynamic from "next/dynamic";

export default dynamic(() => import("./PortalInner"), { ssr: false });
