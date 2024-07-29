import Image from "next/image";
import successIcon from "@/app/assets/succes.png";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

export const PanelSuccess = ({ success }: { success?: boolean }) => {
  return (
    <Fade in={success} style={{ transitionDelay: "300ms" }}>
      <Box
        sx={{
          position: "absolute",
          width: { xs: "100%", md: "30%" },
          height: { xs: "100%", md: "calc(100vh - 5rem)" },
          backgroundColor: "#bef9c4",
          display: "grid",
          placeItems: "center",
          borderStyle: "solid",
          borderWidth: { xs: "8px", md: 0 },
          borderColor: "#81ff60",
          zIndex: 10,
          filter: "opacity(70%)",
        }}
      >
        <Box
          sx={{
            width: { xs: "33%", md: "50%" },
            aspectRatio: "1 / 1",
            position: "relative",
          }}
        >
          <Image
            src={successIcon}
            alt="success"
            sizes="300px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
};
