# Origik

Origik es una herramienta de código abierto sencilla que te permite verificar la autoría de cualquier contenido en formato de texto. Utiliza tokens NFT para identificar el origen de una firma y emplea firmas de clave pública/privada para garantizar la autenticidad del contenido.

Puedes implementar Origik en tus propios servidores siguiendo el manual que se encuentra a continuación. En esta guía, desplegaremos una versión de Origik utilizando la red de prueba de Ethereum Goerli, realizando todo el proceso en entornos gratuitos.

Para certificar el contenido de tu organización en producción, te recomendamos utilizar la red productiva Mainnet de Ethereum. Si necesitas ayuda en este proceso, no dudes en contactar al equipo de Origik en info@origik.com.

# Despliegue de Origik en red Ethereum Goerli y Render.com

## 1. Crea tu wallet Ethereum en la red de prueba Goerli

Durante toda la guía necesitarás realizar varias transacciones en la red Ethereum Goerli para poder crear tus tokens NFT que identifican al autor de las firmas. Por eso, lo primero que haremos será crear un wallet utilizando Metamask, un gestor de monederos de primer nivel utilizado por millones de usuarios.

Metamask puede ser instalado directamente en tu navegador Chrome a través de su extensión que podrás instalar aquí: https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es

Puedes ver un video sobre cómo instalar Metamask y cómo crear tu monedero en el siguiente video de Youtube:

[![COMO CREAR una Billetera de MetaMask | CREAR WALLET METAMASK en Edge y en Chrome](https://img.youtube.com/vi/HwF-VChYzpc/0.jpg)](https://www.youtube.com/watch?v=HwF-VChYzpc)

Una vez creado el monedero, recuerda que en esta guía utilizaremos la red de prueba Ethereum Goerli para realizar nuestro despliegue de Origik. Antes de ir al siguiente paso, selecciona esta red en Metamask. Para hacerlo, en la extensión de Metamask haz click en el desplegable de la esquina superior izquierda que abrirá el selector de redes. Una vez aquí, pulsa en ``Mostrar redes de prueba`` y selecciona Goerli.

Enviar GoerliETH al monedero https://goerli-faucet.pk910.de/ o https://faucet.paradigm.xyz/.

## 2. Envía GoerliETH a tu monedero

Para poder realizar transacciones, necesitarás añadir un poco de Ethereum a tu wallet. En Ethereum Goerli puedes añadir Ethereum a tu wallet de forma gratuita utilizando servicios llamados Faucet. Te recomendamos utilizar el que encontrarás en el siguiente enlace:

https://goerli-faucet.pk910.de/

Este servicio Faucet de Ethereum Goerli añadirá monedas a tu wallet poco a poco, por lo que una vez que introduzcas la dirección de tu wallet, tendrás que esperar un rato hasta que el servicio de Faucet haya generado, al menos, 0.1 ETH.

A continuación puedes ver un video detallado sobre cómo usar el servicio Faucet que te proponemos:

[![How to faucet Goerli](https://img.youtube.com/vi/NL9LiSSFAFA/0.jpg)](https://youtu.be/NL9LiSSFAFA?t=79)

## 3. Crea una colección de NFTs (ERC-1155)

Ya tienes listo tu monedero para crear tu colección de NFTs que representarán identidades. Para crear la colección de NFTs utilizaremos la plataforma Rarible.com.

En primer lugar, accede a la versión sandbox de la plataforma que permite operar con redes de prueba de Ethereum. Accede a través de este enlace: https://testnet.rarible.com/.

Una vez dentro, identifica tu wallet que has creado en Metamask a través del botón ``Connect wallet``. Cuando pulses, se abrirá tu Wallet de Metamask y solicitará una firma para autorizar el acceso. Cuando pulses en Firmar, verás que Rarible ha conectado tu wallet y aparecerán en tu perfil los Ethereum que generaste en el paso 2.

Ahora vamos a crear una colección de NFTs que representarán las identidades de las personas que firmarán los contenidos. Pulsa Create > Collection > Ethereum > Multiple. Se abrirá una ventana para incluir la configuración de tu colección. Tendrás que añadir, al menos, una imagen y un nombre de tu colección.

IMPORTANTE: Anótate el nombre de tu colección para siguientes pasos.

Cuando termines, pulsa ``Create collection`` y se te abrirá Metamask para firmar la transacción.

## 4. Crea tu primer NFT de identidad (ERC-720)

¡Ya has creado tu primera colección de NFTs! Es el momento de crear el primer NFT que identificará una identidad. Para ello, accede a ``Create > NFT > Ethereum > Single``.

En la ventana que se te abrirá, tendrás que configurar los siguientes elementos:

| Campo | Valor |
| - | - |
| Upload file | Una imagen que identifique a la identidad que estás creando. |
| Put on marketplace | Desactiva esta opción, ya que no queremos comercializar el NFT que estamos creando. |
| Choose collection | Selecciona la colección que creaste antes. |
| Name | Un nombre que identifique a la identidad que estás creando. |
| Royalties | 0 |

IMPORTANTE: Dada la naturaleza de la tecnología blockchain, toda la información que incluyas en esta ficha será pública y no podrá eliminarse nunca (blockchain es una tecnología inmutable), por ello, evita incluir información privada al crear un NFT. Por ejemplo, puedes usar una imagen que uses habitualmente en internet para identificarte y tu nombre y apellidos o tu nick de Twitter (X). Esta información es pública, y permite identificarte de forma sencilla.

Cuando pulses ``Create item`` tu NFT se creará y tendrás disponible en tu colección la primera identidad.

Por defecto, cuando crear un token NFT nuevo, se vincula a tu wallet de Metamask y, por lo tanto, la identidad estará asociada a ti. Al final de la guía veremos cómo transferir un token NFT a otro wallet para asignar la identidad a otra persona.

## 5. Crea un API_KEY para usar la API de rarible.com

Origik utilizará la API de Rarible para obtener información sobre la colección que has creado. Por eso, antes de ir al siguiente paso, obten un API TOKEN de Rarible a través del siguiente enlace: https://api.rarible.org/registration.

Durante el proceso, Rarible te pedirá tu email para enviarte el API TOKEN.

En el email que te enviará Rarible verás 2 tokens: uno para mainnet y otro para testnet. En esta guía usaremos el de testnet. Anótalo para utilizarlo en los siguientes pasos.

## 6. Crea una KEY para usar la API de Infura

Además de usar Rarible para obtener información sobre tu colección, Origik usar Infura para obtener información de la red Ethereum y validar que las firmas que realizan los usuarios sean válidas. Infura es un servicio que permite, a través de su API, interactuar con un gran número de redes blockchain del mercado.

Para que Origik pueda acceder a la API de Infura, tendrás que crear una cuenta en https://app.infura.io/register y generar un KEY con soporte para la red Goerli de Ethereum. Puedes observar el detalle de los pasos en el siguiente video de Youtube:

[![Infura.io API Key - Register and create a key](https://img.youtube.com/vi/Mmkhyv8zRw4/0.jpg)](https://youtu.be/Mmkhyv8zRw4)

Anota la clave que has generado para utilizarla en los siguientes pasos.

## 7. Despliega Origik y firma información

Ya estamos preparados para desplegar tu versión de Origik. En este punto, deberías tener creada tu colección de NFTs y deberías haber creado ya tu primera identidad asociada a tu monedero Metamask. También contarás con las KEYs para usar las APIs de Rarible e Infura.

Puedes desplegar una versión de Origik de forma automática usando el botón ``Deploy to Render`` para realizar un despliegue en la plataforma PaaS Render.com. Puedes ver el detalle sus planes de precio aquí: https://render.com/pricing.

[![Desplegar Origik en Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/jpruden92/origik)

IMPORTANTE: El despliegue automático que te ofrecemos usa la capa gratuita de render.com. Únicamente introduciendo una tarjeta, podrás probar Origik de forma gratuita durante 90 días. Origik funciona sobre 2 tipos de servicio:

- Servicio Docker. Utilizamos una imagen Node.js para alojar el front y back de la herramienta. El coste de este servicio es gratuito en render.com.
- Base de datos Postgresql. Utilizamos esta base de datos como capa de persistencia para almacenar las firmas realizadas por los usuarios. El coste de este servicio en render.com es gratuito durante 90 días.

Cuando realices el despliegue automático de Origik en Render, observarás que se configuran de forma automática varias variables de entorno. Es muy importante que revises que tienes disponibles las siguientes variables de entorno con el valor correcto:

| VARIABLE DE ENTORNO | VALOR |
| - | - |
| COLLECTION_NAME | El nombre que le diste a tu colección en el paso 3. |
| COLLECTION_NETWORK | ETHEREUM |
| DATABASE_URL | Esta variable es configurada de forma automática por Render.com para vincular de forma correcta tu base de datos Postgresql. No la modifiques. |
| INFURA_KEY | La clave que generaste en el paso 6. |
| RARIBLE_API_KEY | La clave que generaste en el paso 5. |
| RARIBLE_API_URL | https://testnet-api.rarible.org/v0.1 |

# Cómo utilizar Origik

## Firmar un texto

Para realizar una nueva firma utilizando Origik tendrás que acceder a https://[nombre_de_tu_servicio].onrender.com/sign.

Si tienes la extensión de Metamask instalada y tu wallet configurado, Origik detectará tu wallet y obtendrá tu identidad de forma automática. Recuerda, que para que Origik detecte una identidad válida, en tu wallet tendrás que tener un token NFT de la colección que creaste en la sección anterior.

Para firmar un texto, únicamente tendrás que escribir el contenido en el campo ``Texto a firmar`` y pulsar ``Firmar``. Metamask se abrirá para firmar el texto con tu clave privada. Si aceptas la firma, Origik recibirá la firma realizada y la almacenará junto al contenido firmado. Origik almacena los siguientes elementos para permitir a otros usuarios consultar la validez de cualquier firma:

| Atributo |
| - |
| Texto firmado |
| Firma criptográfica |
| Clave pública del autor |
| Token aleatorio para consultar la información de la firma |

IMPORTANTE: La clave privada (que es la que usa el usuario para firmar) nunca se almacena en Origik. Esta clave está alojada en Metamask, que se encarga de su protección.

Si la firma se completa de forma satisfactoria, Origik generará un enlace que podrás incluir en tus mensajes (emails, artículos, etc) para que los receptores puedan verificar la autoría de tu contenido.

A continuación, te dejamos un video de Youtube con el proceso de firma detallado:

[![Firma en Origik](https://img.youtube.com/vi/etWDM8eFwKc/0.jpg)](https://youtu.be/etWDM8eFwKc)

## Tranferir tokens NFT de identidad a otras personas

Para que Origik tenga utilidad, y permita que otras personas de tu organización / comunidad verifiquen sus contenidos, es necesario que aprendas a transferir tokens NFT a otras personas. Para realizar esta operación tendrás que seguir los siguientes pasos:

1. Pide a la persona que va a recibir el token NFT que cree un monedero con Metamask. Tendrá que seguir el paso 1 de la sección anterior (Crea tu wallet Ethereum en la red de prueba Goerli).
2. Pidele su clave pública (dirección de wallet). Será algo del tipo 0xEfB69A2e268ef63973bd1879db8C1cCE46a6904B.
3. Accede a https://testnet.rarible.com/ y en el menú de tu perfil selecciona ``My NFTs``.
4. Pulsa en el NFT que quieres transferir y pulsa Transfer.
5. Pega la clave pública (dirección de wallet) de la persona que va a recibir el NFT y pulsa Continue.
6. Metamask te solicitará una confirmación. Cuando confirmes, el token NFT se transferirá.
7. Ahora, si la otra persona accede a https://[nombre_de_tu_servicio].onrender.com/sign observará que Origik detecta su nueva identidad a través del token NFT obtenido.

-------------------------------

¿Tienes alguna duda más sobre Origik? Puedes contactar con el equipo en info@origik.com.