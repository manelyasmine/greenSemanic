import * as React from 'react';
import { useState, useRef, useEffect } from 'react'; // Import useRef and useEffect hooks
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Desktop as DesktopIcon } from '@phosphor-icons/react/dist/ssr/Desktop';
import { DeviceTablet as DeviceTabletIcon } from '@phosphor-icons/react/dist/ssr/DeviceTablet';
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Button } from '@/components/commun/Button';
import { palette } from '@/styles/theme/colors';
import EmissionByTypeItem from '@/components/special/ListItem/EmissionByTypeItem';

const iconMapping = {
  Desktop: DesktopIcon,
  Tablet: DeviceTabletIcon,
  Phone: PhoneIcon
} as Record<string, Icon>;

export interface TrafficProps {
  sx?: React.CSSProperties;
  data: { sub_category: string; total_emission: number; quantity: number }[];
}

export function EmissionByType({ sx, data }: TrafficProps): React.ReactElement {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const stackRef = useRef<HTMLDivElement>(null); // Ref to Stack component

  useEffect(() => {
    // Scroll to bottom of Stack when currentPage changes
    if (stackRef.current) {
      stackRef.current.scrollTop = stackRef.current.scrollHeight;
    }
  }, [currentPage]);

  const handleLoadMoreClick = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment currentPage on "Load More" click
  };

  return (
    <Card sx={sx}>
      <CardHeader
        action={
          <Box display="flex" alignItems="flex-end">
           
              <Button btnType="link" sx={{ color: palette.primary[500], fontWeight: 700 }} onClick={handleLoadMoreClick}>
                Load More
              </Button>
            
          </Box>
        }
        title={
          <Typography variant="h6" component="div" fontWeight={700}>
            Emission By Sub-Category
          </Typography>
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      />
      <CardContent>
        <Stack spacing={2} sx={{ maxHeight: '300px', overflowY: 'auto' }} ref={stackRef}>
          {data.length > 0 ? (
            data.slice(0, currentPage * itemsPerPage).map((item, index) => (
              <EmissionByTypeItem
                key={index}
                units={item.quantity}
                target={item.sub_category}
                value={item.total_emission}
                diff={0.9} // Example value for diff and trend, adjust as needed
                trend={'up'} // Example value for diff and trend, adjust as needed
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No data available
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default EmissionByType;
