class ApplicantsController < ApplicationController
  def new
    render :new
  end

  def create
    @applicant = Applicant.new(applicant_params)

    if @applicant.save
      render :show
    else
      @errors = @applicant.errors.full_messages
      render :errors
    end
  end

  def update
    #find applicant and verify that we found it
    @applicant = Applicant.find_by_id(params[:id])

    unless @applicant
      @errors = ['Cannot find Applicant']
      render :errors
    end

    # edit the model
    updated = @applicant.update(applicant_params)

    # check that the model was updated successfully and respond
    if updated
      render :show
    else
      @errors = @applicant.errors.full_messages
      render :errors, status: 400
    end
  end

  def show
    @applicant = Applicant.find_by_id(params[:id])

    if @applicant
      render :show
    else
      @errors = ['Cannot find Applicant']
      render :errors, status: 400
    end
  end

  private

# Strong params
  def applicant_params
    params.require(:applicant).permit(
      :first_name,
      :last_name,
      :region,
      :phone,
      :email,
      :phone_type,
      :source,
      :over_21,
      :reason,
      :workflow_state
    )
  end
end
