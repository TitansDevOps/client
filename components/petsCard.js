import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { getEnv } from '@/utils/api';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

export default function MultiActionAreaCard({ pet, onEdit, onDetails, onDelete }) {
  const url = getEnv();
  const image = pet.files[0]?.webPath
    ? `${url}/${pet.files[0].webPath}`
    : 'https://static.vecteezy.com/system/resources/previews/022/666/029/non_2x/tiger-face-silhouettes-tiger-face-svg-black-and-white-tiger-vector.jpg';

  const menuRef = React.useRef(null);

  const menuItems = [
    {
      label: 'Detalles',
      icon: 'pi pi-eye',
      command: () => onDetails?.(pet),
    },
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => onEdit?.(pet),
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => onDelete?.(pet), // Evita error si onDelete es undefined
    },
  ];

  return (
    <Card
      sx={{
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 3,
      }}
    >
      <CardActionArea onClick={() => onDetails?.(pet)}>
        <CardMedia
          component="img"
          image={image}
          alt={pet.name}
          sx={{ height: 180, objectFit: 'cover' }}
        />
        <CardContent sx={{ paddingBottom: 2 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {pet.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {pet.description || 'Sin descripción'}
          </Typography>
        </CardContent>
      </CardActionArea>

      <div className="flex justify-center items-center py-1">
        <Menu model={menuItems} popup ref={menuRef} />
        <Button
          icon="pi pi-ellipsis-h"
          className="p-button-text p-button-plain text-gray-600"
          onClick={(event) => menuRef.current.toggle(event)}
          aria-haspopup
          aria-controls="popup_menu"
          tooltip="Opciones"
        />
      </div>
    </Card>
  );
}
