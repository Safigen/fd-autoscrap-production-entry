import { Button } from '@guidewheel/ui/button';
import { FlexColumn } from '@guidewheel/ui/layout';
import { GuidewheelLogo } from '@guidewheel/ui/assets';
import { AlertTriangleIcon } from '@guidewheel/ui/icons';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Prototype banner */}
      <div className="flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: 'var(--color-danger-0)', color: 'var(--color-danger-700)', borderBottom: '1px solid var(--color-danger-200)' }}>
        <AlertTriangleIcon size="xs" />
        Prototype — not connected to production data
      </div>

      <div className="flex flex-1 items-center justify-center">
        <FlexColumn spacing={4} className="items-center">
          <GuidewheelLogo className="w-48" />
          <h1 className="text-2xl font-semibold text-foreground">
            Fd Autoscrap Production Entry
          </h1>
          <p className="text-muted-foreground">
            Your new Guidewheel app is ready. Start building!
          </p>
          <Button color="primary">Get Started</Button>
        </FlexColumn>
      </div>
    </div>
  );
}

export default App;
