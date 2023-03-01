import Grid from "@mui/material/Grid"

import { assetCollection } from "../../../network/constants/assetCollection"
import FarmPoolsCard from "./FarmPoolsCard"

export default function FarmPools() {
  return (
    <Grid container spacing={{ xs: 2, md: 4 }}>
      {assetCollection.assetGroups.map((assetGroup, id) => (
        <Grid key={id} item xs={12} sm={6} md={4}>
          <FarmPoolsCard assetGroup={assetGroup} />
        </Grid>
      ))}
    </Grid>
  )
}
