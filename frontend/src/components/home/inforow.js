import { Box } from "@mui/material";

 const InfoRow = ({ label, value, danger = false }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            fontWeight: 500,
            color: danger ? "red" : "black",
          }}
        >
          {label}
        </Box>
  
        <Box
          sx={{
            flex: 1,
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}
        >
          {value}
        </Box>
      </Box>
    );
  };

  export default InfoRow
  