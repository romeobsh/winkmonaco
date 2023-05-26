import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import Link from "next/link";

export default function CustomDatagridToolbar() {
  return (
    <GridToolbarContainer sx={{ justifyContent: "space-between", mb: 2 }}>
      <div>
        <GridToolbarColumnsButton sx={{ color: "black" }} />
        <GridToolbarFilterButton sx={{ color: "black" }} />
        <GridToolbarDensitySelector sx={{ color: "black" }} />
        <GridToolbarExport sx={{ color: "black" }} />
      </div>
      <div>
        <Link href={location.href + "/create"}>
          <Button size='small' color='primary' variant='contained' startIcon={<Add />}>
            Ajouter un article
          </Button>
        </Link>
      </div>
    </GridToolbarContainer>
  );
}
