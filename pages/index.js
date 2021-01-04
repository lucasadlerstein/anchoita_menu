import React, {useContext} from 'react';
import styled from '@emotion/styled';
import seleccionContext from '../context/seleccion/seleccionContext';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Logo = styled.img`

`;

const Lista = styled.ul`
  li {
    padding: 1rem 0;
    border-bottom: 1px solid #7a7a7a;
    text-transform: uppercase;
    span {
      color: #7a7a7a;
    }
  }
  li:last-of-type{
    border-bottom: 1px solid transparent;
  }
`;

const ListaSubItems = styled.ul`
  li {
    border: none;
    padding: 0;
    text-transform: none;
  }
`;

const Inicio = () => {

  const SeleccionContext = useContext(seleccionContext);
  const { cambiarSeleccion, etapa } = SeleccionContext;

  const router = useRouter();

  const clickEtapaInicial = selec => {
    cambiarSeleccion('etapa', selec);
    router.push(`/menu`);
  }

  const clickVinosInicial = selec => {
    cambiarSeleccion('etapa', 'vinos');
    cambiarSeleccion('v_pais', selec)
    router.push(`/menu`);
  }

  return (
    <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>Anchoita | Menú Digital</title>
      <meta name="description" content="" />
      <meta name="keywords" content="menu, anchoita, comida, vinos, Anchoita Argentina, Juan Ramírez de Velasco 1520" />
      {/* <meta name="robots" content="index, follow" /> */}
      <link
          rel="preload"
          href="/fonts/RobotoCondensed/RobotoCondensed-Regular.ttf"
          as="font"
          crossOrigin=""
      />
      <link
          rel="preload"
          href="/fonts/RobotoCondensed/RobotoCondensed-Bold.ttf"
          as="font"
          crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/Henderson/Henderson-Sans-Regular.otf"
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href="/fonts/Henderson/Henderson-Sans-Bold.otf"
        as="font"
        crossOrigin=""
      />
    </Head>
    <div style={{width: '60%', margin: 'auto'}}>
      <Logo className="my-5" src="img/logo.png" alt="Logo Anchoita" />
      <Lista>
        <li><span>01. </span>
          <a
            onClick={() => clickEtapaInicial('comidas')}
          >Comida</a>
        </li>
        <li><span>02. </span>
          <a onClick={etapa === 'vinos' ? () => cambiarSeleccion('etapa', null) : () => cambiarSeleccion('etapa', 'vinos')}>
            Vinos
          </a>
          {
            etapa === 'vinos' ? (
              <ListaSubItems>
                <li>
                  <a
                    onClick={() => clickVinosInicial('copa')}
                  >
                    Por copa
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => clickVinosInicial('argentina')}
                  >
                    Argentina
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => clickVinosInicial('mundo')}
                  >
                    Del mundo
                  </a>
                </li>
              </ListaSubItems>
            ) : null
          }
        </li>
        
        <li><span>03. </span>
          <a
            onClick={() => clickEtapaInicial('cocteleria')}
          >
            Coctelería
          </a>
        </li>
        <li><span>04. </span>
          <a
            onClick={() => clickEtapaInicial('bebidas')}
          >
            Bebidas
          </a>
        </li>
      </Lista>
    </div>
    </>
  );
}
 
export default Inicio;