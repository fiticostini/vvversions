import React from "react";
import { useForm } from "react-hook-form";


export const Register = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const OnSubmit = (data) => {
        console.log(data)

    }

    return (<div className="d-flex">
        <div className="form row">
            <form onSubmit={handleSubmit(OnSubmit)}>


                <input type="text" {...register(`username`, {
                    required: true,
                    maxLength: 20
                })} placeholder="username">
                </input>
                {errors.username?.type === `required` && <p className="text-danger">el campo es requerido</p>}
                {errors.username?.type === `maxLength` && <p className="text-danger">20 caracteres máximo</p>}


                <input type="email" {...register(`email`, {
                    required: true
                })} placeholder="email">
                </input>
                {errors.email?.type === `required` && <p className="text-danger">El Campo es Requerido</p>}

                <input type="password" {...register(`password`, {
                    required: true
                })} placeholder="set password">
                </input>
                {errors.password?.type === `required` && <p className="text-danger">El Campo es Requerido</p>}

                <input type="text" {...register(`artistname`, {
                    required: true
                })} placeholder="Name of Band, Soloist, Artist Collective">
                </input>
                {errors.artistname?.type === `required` && <p className="text-danger">El Campo es Requerido</p>}

                <select {...register(`role`, {
                    required: true
                })} placeholder="Role">

                    <option value="Musicians"> Musicians/Producer
                    </option>
                    <option value="Manager"> Manager/Representative
                    </option>
                    <option value="Other"> Other
                    </option>
                </select>

                <input type="submit" value="submit"></input>
            </form>
        </div>
        <div className="publicity"></div>
    </div>

    )
}



