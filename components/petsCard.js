import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { getEnv } from "@/utils/api";

export default function MultiActionAreaCard({ pet, onEdit, onDetails }) {
  const url = getEnv();
  const image = pet.files[0]?.webPath
    ? url + "/" + pet.files[0]?.webPath
    : "https://static.vecteezy.com/system/resources/previews/022/666/029/non_2x/tiger-face-silhouettes-tiger-face-svg-black-and-white-tiger-vector.jpg";
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={pet.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pet.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {pet.adoptionCenter && pet.adoptionCenter.name
              ? pet.adoptionCenter.name
              : "Sin centro asignado"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onDetails(pet)}>
          Detalles
        </Button>
        <Button size="small" color="primary" onClick={() => onEdit(pet)}>
          Editar
        </Button>
      </CardActions>
    </Card>
  );
}
