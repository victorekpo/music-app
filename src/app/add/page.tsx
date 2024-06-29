'use client'

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useCtx } from "@/components/Context";
import { Button, Input } from "@nextui-org/react";
import { ADD_SONG } from "@/components/Context/actions";
import { ADD_MUSIC_QUERY } from "@/graphql/queries/addMusic";
import styles from "./page.module.css";

const initialFormState = {
  artist: '',
  song: '',
  album: '',
  genre: '',
  BPM: '',
  speed: '',
  mood: '',
  tags: '', // Todo: change to array
  quotes: '' // Todo: change to array
}

const AddMusicPage = () => {
  const [state, dispatch] = useCtx() as any;
  const { user } = state;

  const [formState, setFormState] = useState(initialFormState);

  const [addMusic, { error }] = useMutation(ADD_MUSIC_QUERY)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form state", formState);
    await addMusic({
      variables: {
        song: { ...formState },
        user
      }
    })
    dispatch({
      type: ADD_SONG,
      payload: { ...formState }
    })
  }

  return (
    <>
      <div className=''>Add Music Page</div>
      <form className={styles.formContainer} onSubmit={ handleSubmit }>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="Artist"
            label="Artist"
            required
            onChange={ (e) => {
              setFormState((prev) => ({
                ...prev,
                artist: e.target.value
              }))
            } }
          />
          <Input
            type="Song"
            label="Song"
            required
            onChange={ (e) => {
              setFormState((prev) => ({
                ...prev,
                song: e.target.value
              }))
            } }
          />
          <Input
            type="Album"
            label="Album"
            onChange={ (e) => {
              setFormState((prev) => ({
                ...prev,
                album: e.target.value
              }))
            } }
          />
          <Input // change to dropdown
            type="Genre"
            label="Genre"
            onChange={ (e) => {
              setFormState((prev) => ({
                ...prev,
                genre: e.target.value
              }))
            } }
          />
          <Input
            type="BPM"
            label="BPM"
            onChange={ (e) => {
              setFormState((prev) => ({
                ...prev,
                BPM: e.target.value
              }))
            } }
          />
          <Input // change to dropdown
            type="Speed"
            label="Speed"
            onChange={ (e) => {
              setFormState((prev) => ({
                ...prev,
                speed: e.target.value
              }))
            } }
          />
        </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input // change to dropdown
              type="Mood"
              label="Mood"
              onChange={ (e) => {
                setFormState((prev) => ({
                  ...prev,
                  mood: e.target.value
                }))
              } }
            />
            <Input // change to array
              type="Tags"
              label="Tags"
              onChange={ (e) => {
                setFormState((prev) => ({
                  ...prev,
                  tags: e.target.value
                }))
              } }
            />
            <Input // change to array
              type="Quotes"
              label="Quotes"
              onChange={ (e) => {
                setFormState((prev) => ({
                  ...prev,
                  quotes: e.target.value
                }))
              } }
            />
          </div>
            <Button type="submit" color="primary">Submit</Button>
      </form>

    </>
)
}

export default AddMusicPage