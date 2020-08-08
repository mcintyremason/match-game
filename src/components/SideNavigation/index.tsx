import React from 'react'
import {
  Drawer,
  Divider,
  List,
  ListItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

const SideNavigation = ({ open, handleDrawerClose }: any) => {
  return (
    <Drawer variant='persistent' anchor='right' open={open}>
      <div>
        <IconButton onClick={handleDrawerClose}>
          {/* <ChevronRightIcon /> */}
          {'>'}
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideNavigation
