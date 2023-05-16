import Body from './components/Body';
import Header from './components/header/Header';
import Main from './components/Main';
import './globals.css';

export const metadata = {
  title: 'Project Portfolio',
  description: 'A single website containing all of my projects'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Body>
        <Header />
        <Main>{children}</Main>
      </Body>
    </html>
  );
}
