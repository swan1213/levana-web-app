import { Box, Tab, Tabs, AppBar } from "@mui/material/"
import React, { useState } from "react"
// import { useHistory } from "react-router-dom"

import Card from "../Card"
import Page from "../Page"
import { useStyles } from "./manageStakeStyles"
import ManageStakeTabPanel from "./ManageStakeTabPanel"
import { TabsKey } from "./types"

export const manageStakePath = "/gov/stake"

export default function ManageStakeTabs() {
  const classes = useStyles()
  // TODO:
  // const history = useHistory()

  // const hashKey = history.location.hash.slice(1)
  // const defaultKey = Object.values(TabsKey).includes(hashKey as TabsKey)
  //   ? hashKey
  //   : TabsKey.Stake

  // const [activeKey, setActiveKey] = useState<TabsKey>(defaultKey as TabsKey)

  // const handleChangeTab = (
  //   _event: React.ChangeEvent<{}>,
  //   newValue: TabsKey
  // ) => {
  //   setActiveKey(newValue)
  //   history.push(`/gov/stake#${newValue}`)
  // }

  return (
    <Page>
      <Card>
        <Box className={classes.root}>
          <Box>
            <Box>
              <AppBar position="static" color="default">
                <Tabs
                  // value={activeKey}
                  // onChange={handleChangeTab}
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="manage stake"
                >
                  <Tab label="Stake" value={TabsKey.Stake} />
                  <Tab label="Unstake" value={TabsKey.Unstake} />
                </Tabs>
              </AppBar>
            </Box>
            <Box className={classes.tabsContainer}>
              {/* <ManageStakeTabPanel
                tabKey={TabsKey.Stake}
                activeKey={activeKey}
              />
              <ManageStakeTabPanel
                tabKey={TabsKey.Unstake}
                activeKey={activeKey}
              /> */}
            </Box>
          </Box>
        </Box>
      </Card>
    </Page>
  )
}
