import React, { useState, useEffect } from 'react';
import Nav from '../../../Components/Nav';
import Instrument from '../Instrument';

export default function Woodwind() {
    let [ loggedIn,, ] = useState(localStorage.hasOwnProperty("ACCESS_TOKEN"));
    const [ accountData, setAccountData ] = useState({});
    const [ currInstrument, setCurrInstrument ] = useState(0);

    useEffect(() => {
        if (loggedIn) {
            fetch("/getUserData", {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("ACCESS_TOKEN")
                }
            })
                .then(response => response.json())
                .then(response => {
                    if (response.status === 200)
                        setAccountData(response.data);
                    // eslint-disable-next-line
                    else loggedIn = false;
                });
        }
    }, []);

    const changeInstrument = inst => {
        fetch("/Instruments.json", {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.filter(instr => instr.name === inst)[0]);
                setCurrInstrument(response.filter(instr => instr.name === inst)[0]);
            });
    }

    return (
        <React.Fragment>
            <Nav loggedIn={loggedIn} account={accountData} />
            <div className="instruments">
                {
                    currInstrument === 0 ?
                        <React.Fragment>
                            <div className="options">
                                <div className="instrument">
                                    <h4 onClick={() => changeInstrument("Flute")}>Flute</h4>
                                    <div className="img">
                                        <img alt="" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEHEBUUBxIPFhAREhIXEBUSEBUSExgQFhoXFiAWFRMYHzQsGBslGxUTIT0iJzU3Li4uFyE/ODMsPSgtOi0BCgoKDQ0OFRAQFysgHR0tLS0tLSsrNysrKy0tLS03KzcvNys3KzcrNy03KysrKysrNy0tKysrKysrKysrKysrK//AABEIAJ8BPgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAgQDB//EADcQAAIBAgUCAwUFCAMAAAAAAAABAgMRBAUSITFBURMiYTJCUnGBFCORodEGFTNDYnKx8CWCwf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABoRAQEBAAMBAAAAAAAAAAAAAAABESFBUTH/2gAMAwEAAhEDEQA/APuIAAAAAAABE/tDjquCgvsMNVSbtG/EVze1930S7sljyr0FXVqi26d0+6fRgRGT5wsTG2JavezdtLU/hnD3JLb57dybTK/mWV+bXTlpmlZVLXi4/DWh7y356el3fXLc1lh5eHjItSSu4O78vGulP+ZDj1VwLGDSlVVVJ02mnw1wbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAauN+SEzbLadWyxSk6VvK7/AMOfxJ+7036W6E6Ycb8gfPcu/aWeXYurhsYpRjTlanVmtPiQsmpzilbTvbxFt3SL3h8VHELy8rldV+q9TkrYLwXejFShJNSg7XSfwt9PQhqVGeWXdGD8CEnphBN16cO6jfzQ58q4XF+FMFsBwYDMY4lJ3jaSWmUX5Jf2vo/Tk7ygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeNegqu/DXDXK/Veh7ACu4rL5UZueD0xqSf3lOW1Gs+dS+Cp6r6p7NdOWZoqqalq8llUjNWq03/Wuse0ls13JWpSVRWnuiKzHAKpaUpOM4fw60ba436VFxKHz2+u4EvGSl7LW/FuLGxXMNmU8HNU8XFRqy9mKb8Oq/iot8PluL/PlztCuqq8uzXtJ8p9mB7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGribACMxmXxqpxqwU6T933ovvB32fXazXQjnVll9pYmblStaOI5lFfDXiuV/V+NuSx2ObEUG7ujZSftJ+zJev6gaYXHKs3GVlJdneLXeL6naVuOAeX7ZfFumneVC9pQfx0JX2/tvbba295LA5iqyTctUHsp2tv8M4+5L0/wBJAwjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHDmnkg5RjJyhdx0+1f/1FfwmLWOnJ0vusSmk20/BrR6Ka67dfaX5O2kNm+RxxsbQ2Td5JPSm1w1bh36mbvSzO2cBj7Xi4yUoe3Se84r4oP+ZD/fRS1Oopq8HdPgq1KcoyUcbGU/D1OOpJzjFK19Ss5XT6fgdmHxrw7+90rVdwmm3SqJb2k/cqJd+bcvdKymLADww+KjiFeH1XVHsmVGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcuMwccSt9n0fr69yt43EVcnrOVeN6E4xuqad1UTtra4ad12sW48q9GNdNVFdEsWVXqNWdZOpg5QSfmipwaa2Scbp+y7L8fkTGAx/2mEXNWc4prs/k+/oV/N8ur4Czy1vRq3ikrWbs79rLqR7oVXiNWFlhPBVCOmFNaK7xSlqld8aGr89XtblyUsX1O5krdTOG4yjScoyi9nPTfy2bjLS3Z2+T/AMk5gK3j04yd/Mrq/Nul/pY0joAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrKOpWfBBZpkt5RqYZexOM5RW2px4Ta6Xt+H0J8wyWLqhYPL6KqzjSoqjKc3Xn4b1KdXZNy1LfZ8JW5J3DY37BOUK84uKjGS1NQbi+dPTZ2du0vx7s0yqOLV6d4z6OMnFv01L5IruCjUy+pOGIjKWqzje3S+pNvjhO/H5E3F+rhQrxrJOk00+x63KlhcX+71OdOLVOUlKCi04pSsvDlB20vUm9r+19Cw5dmEMwipUH3unyrNp/mmvoaZdgMJ3MgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACxy47AwxitWSuuHbhnUAKVnWU05QdLNqaqUdSqKTukpw3Wy3fHJHrNv3PSnVqVaXhSrpU24zTjXqyeqCcIu61ald33W59ArUY1laororGaZbVy5f8e70b7we9n3Td7dzOWNSypfJ81+2wXjLTNuUfRyg3F2fzT+hKHzvVPA0KtXBwxVSU6kYypU3GTc20nVSmvLd3ZYMmzqelrMPcm6bktm5XtF266k1xw+r5LKliyg5sJi44pfd3uuU1Z/7szpKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGs46ubfU2AEXicohKWuOpWjJaIO0Xe27iuWin51lUcG39mddxnK7c5JONm21TuuFKz3+luv0No5cXl8MUmqt7PlJtb9/R+pmzVlxVchxk4Vm61tVnphbS3FtXs3zJONrWXUt+Hrxrq9J3T/z2fZlTzbLWpKNOXlp21aktUttnFqO1uyf0PPL8znh4xnXlZT2jNraUbu3ipbLpv69eqeLeeYuyBx4PHRxO3E0t4vm3dd16nWnc0yyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxr4eNdfeK/wCT/Egs/wAHdRhQfhw21Wi2pRV1oe9krW6MsZpUpqorTSafRgUPB68M5PDwm4Qk0ox3qQtvrjd+xva3oizZVnccUl4so+b2JraM+n/WX9L6nbXwUJxSitNvZcbJr5EG8k8StLiLdvHSSdOpB9XG+0+l19b7BbdWdO5kxEyEAAAAAAAAf//Z" />
                                    </div>
                                </div>
                                <div className="instrument">
                                    <h4 onClick={() => changeInstrument("Clarinet")}>Clarinet</h4>
                                    <div className="img">
                                        <img alt="" src="https://d1aeri3ty3izns.cloudfront.net/media/23/239609/1200/preview.jpg" />
                                    </div>
                                </div>
                                <div className="instrument">
                                    <h4 onClick={() => changeInstrument("Saxophone")}>Saxophone</h4>
                                    <div className="img">
                                        <img alt="" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhUTBxMWFhIWGB0YFxgXGCIdHBgYHiEYIR8XHB0aHyogJBomHhgfITIiJjUtLi4uHiE1ODMtOigvLi0BCgoKDg0OGxAQGy8mICY3LzYtMTctLS03LzUyLTIrNy0tLi8tLy0tLSstLS8yLS0rLS0tNy41Ly0tLS0tLS0vLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xAA/EAACAQIEAwUFBQUHBQAAAAAAAQIDEQQFEiEGMUETIlFhcTJSgZGhBxQVI2JCcrHB0SQzQ1OCouElY3Oy8P/EABkBAQADAQEAAAAAAAAAAAAAAAACAwQFAf/EACQRAQACAgIBAwUBAAAAAAAAAAABAgMREiFBBCJRMTJxwfBh/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAACs0ePcBPEyp4iv2VSDcZRrRlTcWvFzSX1JTKs/w2bO2X1Yydr6d4ycfeUZJNx/Utn4ld+0fhTC5xgHXxjVOrTStUS9tf5ckuafJdVfbqnyXN+IKmHuov+0zqznCcrP7vDVJJUmt9Tt42StsQtb3REJRXrcv0cDm/wBmHHc82oxw+dRm6yelV7LRU6qMrWtO23Kz23u9+kE0QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDzDhHBZlO+Mw8Jc9rWTb2vtbe3UnAeaFIwfANPKKOnAvtKWqbVOpztJ3spdWm3a/lvtckFmlbBYaXYxdZxW0JPTUT91t815vfruWc08wy+ONSaema9mS5+j8Y+RTfFO+VJ7WVv4sx5dmccXhYynpTstWl3UZWV4u6TW/vJEgVOvhpwr2n+XXttKPs1F4b814xf8AyeMq4kf4t2U49zuqduVOctlZ+7KW1nyI0z98bfVK2LrcLeADSpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABH55DVgtXWEotfNJ/Rso+Ay777xNiu1/u1LTzataNOpdeabe/S6J3Ns2qYhtYNXh3npkrP8ALe7i03dal5FfyPFTxWIbxNWMdcprXNadNN6VZWWnW0rWvzfWxz8totljTVSJijouDqOrhISnzcU36tIzHmEVCCUeS2R6N8MoAD0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA081zGGV4RzxN7ctldm4VbjnHfdaUEk3zey+H8G38CvLfhSZTpXlbSEo4+FDCTnSs6nZy0Llqly0xv4uGr/Ub/BOQxpZdGGPheUaUIu73lLfVJ6X4r6sreLy6eYYmCpfsNJz0RajJab+1ffm7rq+exbuBMyWY0ZuMIR6rQ73jeSTlttLbdb2MGDvJG/7ppydV6WXC4aOEo6cOrRXJXbt8zMAdNjAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACk8Qy+/Z44tJxprU7tpdzfnF3vdtWLpUmqcG5ckrnOpZqvuuI0xlrqSjd9Er+zvyeqUvRIzepvERESuw1mdzDRp4zVnSeEklShTlKreLT1RaSV1Jby3vdSW23Ms32euOIwPa0aXZa4Q1R2vqV4tu2124N38yj4mreVeSanfTT2vFyjG7i3ztPVK1+Voq2+x0TgWkoZQ3FWbluvDZNR36q5l9N3eF2bqqxgA6bGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAi+JcT92yao/Fafn/wAFBxWHngqSUk+0b1y02urK66NbO+3LfoWfjvFaKdKn70rtePJfzZRc+zOVKEoUv7x0bNtbxlJx7z8tbWxzfUzFr6a8MartkyHKJ4fAzni5SalKdVqDulTu5aVsnq6KL25Np2Sd04NrywVLsq9PT2lTUrcoqUNSi7+UbK19rXd2RWDpVKuRTUIRlPsWoyl3NTUHtLm01187nv7OM8nxLlVF1ZQbpKLaUk5JxU4yvZvZvS1fxfgTxV1q3yjed7hfwAb2YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADzUmqdNuXJK4HNeIK9TG8SxjiE9NOV3suUU900+kpdVf6kLOvGnm0Jzhdym9UnZOCjdqXe8HJcld+ZLV8ValWq1mld8306v5Ob28iOyXCwzbGqtacowg4pQlZSjPndJq6ehXXjFHFnc2mXRjqF0yKpUjinKTVnLu9214bJyv43TV9uSJzAZbTwONk8JTUIaUu6rJtuTf/AN5kHhqlBYNQi6dOalyn+W5Ldb3W783zt8SfyjFQxGFthpatGzdn9L9DpYePGIY8m9y3gAaFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEXxJX7DJ5/qtH58/pclCrcbydanClTdnK/wv3b/JyfwKs1tUlPHG7QpGLxMqOBpRpWcqtTVJN/su8tvHu2dl0TMOBwE8NOdXC1EpYibagnplGKS0qTu97RVrW3b33sa+ZzU8TGdR2hTjKXRJU1JxV9W28b9HdO2ww2NWOr0kpS04eLjHVC93sozU07Nrbml1ZyI+G9YqmbOlhHRlJuOpuKV7qSc7XfNq8bXdyR4AxyxmbV402pdm5rVF3VnKNouz9ruvbwt1bIXhvI451iJU6rcYxg5Jrfv3Vm0+au2/O3QyZVTq5bjpUsFN0VF2cYJJXTfRqz8d/E1Y7cIi9lNq8p41dRBXcFns6NlmavH/MiuX70f5r5FgpzVWCdNpp7prdNG7HkreN1ZbUms9vQALEQAAAAAAAAAAAAAAAAAAAAAAAAAAfG9Ku+Ry3iLHfesZ2u/syqRjqbfdXd2S8ZR+TXje/8Rx15a05OPO7XVWldejRyjPaUsHOSxDp9ranRcoppNrec5O772pJPku7t4GL1Vpn2tOCPLXeIWJqVFhXZKKgql3pqOMbrS+Td9TdnttdXuSFHMJ0s3Uqb9qnUUkuTT1Lx9nuRauZsHkUMfk1L2VKCk4RnaTldtpybWpWTslFr1NaGDqYKE514yjGSjThK+2mm3GS8dScb/XwOdanuifhqi3Uwt/AGJhHGVKc01VlFSS6OKbvvyvea28ytcWY2GZ5pVrZS5qdHa8HtUilvNLlLS97e62+hhdXE06XbUIunBOdCl0lVdTS5Simn3EoqHSzjs+ZZcDlMcFlMYcmle697rL5l+SeVIxK6RxtzQ+C4phQw9sZNzWlSTUe8/JxS3l6fI2OGuOqE8VL8Nm5U7/mU3FxlC/7cYyV/W2z9SsZtQtmFo7RS1KMYtptPffotuXT4IsWWZ/hqlCKx8knb8uTV29m3BW35Jv4ehmwZpx242+viVuWkXjcfR0+jVVakpUmnFq6a6o9lQ4VzdQx/YX7k7yp+T5uPxV38H4lvO7jvzrtzbV4zoABNEAAAAAAAAAAAAAAAAAAAAAAABW+NcY8Pl7VF992UbRcrNvnaO+yV9ih5Linis9qQxck406naVJeLdON079NW/rKRaOOJdpOUWm1HTfTzvUvGKj52U3vbe3iQiwFPL89dHKqdlP8AMmk/Z7yk1Hy3jZPxOZn3N5bcWoq28fjZ4DA1JSwynTV3BJpvS9+9Fq63b2V9rXtvaM/EKOMyyjLARatBuakrPtVfVsm1zdl8F6feIc1qYSdaFaTjGMY6VKzctSe2z33T5Gnw5FLFYelJKMVpcvJJ653t5X+pRG9zVPxtbMXT7bOadFezhaUYL/ySSu/kl9SH43zx5NlVqC1VaklTox96ctkvTqSWT42EcHKvipJSrTlUs3v3m7JLyS+hVasvxvj2WydPCRVn/wB6a+W0frYlWYtM2/v8/Ty0aiKt/KMrng8mjDE1HOa70peM3u2nzW5ly/hnEZxGU8M1TcJd2fSo+sXDk9tnJNfHcma9JzUKdH2ptJfHr6LmXfB4aODwsYUfZirL+vq+ZdhwRl3N46QvlnHripGRcMV8NjaLrxt2TTck1ZpdOfXkX0A30xxSNQy2tNp3IACaIAAAAAAAAAAAAAAAAAAAAADkDFi6saOGlKtLTFJ3l4eYFVxEFiovETnaMa85uNrtxhHRF872VnNeOorUMNUq1K08PKNKvUjBKq0pKH7Tvd7tNqKX6fgS+NpQwuCdKhiYV+0TpRXcU6acZXcnDeS9d153NHBVVkkJU8TOMpR1Ts5XcoNu28t7rr6nKy/fG+m2n29KHnmKeMxjqYt6rzUW1FvSkk7aXbpJX36+RfOGcJHFYVVMRFaW5KHj2U07RdulptW6XZRM3xdPG4qTw0Gqk41G49FJpxjfvWTaUd/JO3Q6JwjXjiMqdOH+HKUEv0pvS/S1vkVx7vKdumPjDLJZhhFDA2jUi1JJ+zUSv3JLwvFK/mQn2e5XLC4FvFJqpUqSqT1c+do3/wBMU/iWfDwngqDWKnrak2m1uo96VttvdW3huMtenDOctthPU6gjuEpkGH7fNpVJcqasv3pf0j/7FmIrhqj2WVKUudRub+PL/akSp1MNeNIhiyW3aQAFqAAAAAAAAAAAAAAAAAAAAAAAAAVrj3NKmV5DKeBo9tNOLceaUU95NLdrbp69CylW4mzeWDzC1JRlGnSlUqXdttUUt7O1r39CrNbjRPHG7KPmmKo5191rYGHZ1qrTlZK9ndK84+1Huuz8GnbexM57iabyxxxFm9o2tvu43a68lfY1cHh/xGU68rK0rx/S+7JW23VrR9L7oj8xzzD5tkkJKq4Qm9SbTTai2nvySuub2OXe08ZiPLZWO421+G8uljsu1UHFOyhupa4Rq01JWTlo0ppS02TTXPfaxU+GVRy9PLK1SFeKbjOTunJ7vXFWTTa/h4WMfD2H7PE68NKFSFSPaylFd6nfTHspNu7SfJWXVknie1hjoLDuGiTeqL9rdc1v43b8unU91Ma2b+EbRrVHgafbSU6smoVJJNRbV1N+Saprfxkrc0ZKEZzapSl7TSS0pO8nZOTTs/gkj3KpGdZQo8ufw5R+OlIk8iofec/TttTjf48kv9zfwPcdeV4h5adV2t9OCp01GGySsvRHoA67CAAAAAAAAAAAAAAAAAAAAAAAAAAAcm+0OdWlKpUqN04TqwgnUp91xjfaMm+cvZatuo3udZK79oGW/ivC1WmoKb2klezvFp3i/e8CnNTlX8LMdtWUGtJ0eH8SsKpKTpzt+8oKzT84tL1g10K1l1KGKw2Gptvs1h4ONrdFeXxbW/oy6cNYd9r/ANRjplGXYyhq3jJRUo6rdWpyeztaVt+kPnnC1PJsxprKZ9lGo5ukpS7lKrpcmrvlTkr93xfwOXrrXxLbvtZKXa8I4io40pV6FVKMGtDlN25pQt3bbu63/jo1MwWLnKbSp1YRcaic23Ti7N2i0krpc+Zu5O6tPIofiX97RmlJJ3Ud+nlokn6MiPtVwujBqvg7qvplQsv8SNRaVF+k5RaLbe6deEI6/LzwJGVbKXXxd9dacqjv0TdorySjFbF94Npf2epUfOU7L0iv6tlPpRjl+VRhT/ZioK3WyS/kdIyzC/csvhT6xik/N9X8Xdl3po5XmyrNOqxDaABvZgAAAAAAAAAAAAAAAAAAAAAAAAAADDjaXb4WUVza29TMDyY2OYcSSnSq4jsYdnB6ZqpG7n2ifKUdr22sr257Ebx1hZcQRp0YTSUbym487tWt5J3e2+zOs18FTxEr1oJvx6/MiMy4Sw+NqaqSdKp71Pu39Vyf8fMx29Nbe4lojLHlS8uzCOT5eqNOnUqJRUbKLeq0Yrm1bpbd8rETiMxrZnje1zWMacIv8qkndr9U2tnLwS5eL2tdqvB1dq1LF7ecN/4n3Lvs+o0a+vMqkqz932YfFK7fpez8Cuvp8k9TCU5KeEfwdlcs2xar4lPsabvG/wC3NfyT+u3idCPNOCpwSppJJWSSskvBLwPRtx44pGoZ72m07AAWIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z" />
                                    </div>
                                </div>
                                <div className="instrument">
                                    <h4 onClick={() => changeInstrument("Bassoon")}>Bassoon</h4>
                                    <div className="img">
                                        <img alt="" src="https://images-na.ssl-images-amazon.com/images/I/51JrD4iVI6L._AC_SL1000_.jpg" />
                                    </div>
                                </div>
                                <div className="instrument">
                                <h4 onClick={() => changeInstrument("Oboe")}>Oboe</h4>
                                    <div className="img">
                                        <img alt="" src="data:image/jpeg;base64,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" />
                                    </div>
                                </div>
                            </div>
                            <h1>Pick the instrument that you are playing in band!</h1>
                        </React.Fragment> : <Instrument data={currInstrument} />
                }
            </div>
        </React.Fragment>
    );
}
