import Skeleton from '@mui/material/Skeleton';
import { Card, CardHeader, CardContent } from '@mui/material';
function SkeletonPost() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Skeleton
            animation='wave'
            variant='circular'
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation='wave'
            height={10}
            width='80%'
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation='wave' height={10} width='40%' />}
        sx={{ paddingBottom: '0' }}
      />
      <CardContent sx={{ paddingBottom: '0' }}>
        <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
        <Skeleton
          animation='wave'
          width='80%'
          height={10}
          style={{ marginBottom: 3 }}
        />
      </CardContent>
      <Skeleton
        sx={{ height: 300, margin: '1rem 1rem', borderRadius: '8px' }}
        animation='wave'
        variant='rectangular'
      />
    </Card>
  );
}

export default SkeletonPost;
